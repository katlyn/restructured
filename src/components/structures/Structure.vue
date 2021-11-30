<template>
  <div class="structure-wrapper">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="structure"
      :class="{
        'user-editable': userEditable,
        [`tool-${tool}`]: tool !== null,
        grabbing: currentDrag !== null
      }"
      @mousemove="elementMouseMove"
      @touchmove="elementTouchMove"
      @mouseup.left="elementMouseUp"
      @mouseleave="elementMouseUp"
      @touchend="elementTouchEnd"
      @touchcancel="elementTouchEnd"
    >
      <Element
        v-for="atom in structure.atoms"
        :key="atom.id"
        :x="atom.x"
        :y="atom.y"
        :size="size"
        :symbol="atom.symbol"
        :valenceElectrons="atom.valenceElectrons"
        :electronAngle="electronAngles[atom.id]"
        @click.left="elementClick(atom)"
        @mousedown.left="elementMouseDown($event, atom)"
        @touchstart="elementTouchStart($event, atom)"
      />

      <Bond
        v-for="bond in structure.bonds"
        :key="bond.id"
        :from="getAtom(bond.from)"
        :to="getAtom(bond.to)"
        :type="bond.type"
        :size="size"
        @click.left="bondClick(bond)"
      />
    </svg>
    <div v-for="notice of notices" :key="notice.id" class="notice" :class="notice.type">
      {{ notice.text }}
    </div>
    <div v-if="typeof isValid === 'string'" class="notice error">
      Invalid structure! {{ isValid }}
    </div>
    <div class="controls" v-if="userEditable">
      <div class="group">
        <span>General</span>

        <div class="controls">
          <button
            :class="{ active: tool === 'move' }"
            @click="selectTool('move')"
          >
            Move
          </button>
          <button
            :class="{ active: tool === 'atom-add' }"
            @click="addAtom"
          >
            Add Atom
          </button>
          <button
            :class="{ active: tool === 'atom-remove' }"
            @click="selectTool('atom-remove')"
          >
            Remove Atom
          </button>
        </div>
      </div>
      <div class="group">
        <span>Valence Electrons</span>

        <div class="controls">
          <button
            :class="{ active: tool === 'valence-add' }"
            @click="selectTool('valence-add')"
          >
            Add Electron
          </button>
          <button
            :class="{ active: tool === 'valence-remove' }"
            @click="selectTool('valence-remove')"
          >
            Remove Electron
          </button>
        </div>
      </div>
      <div class="group">
        <span>Bonds</span>

        <div class="controls">
          <button
            :class="{ active: tool === 'bond-add' }"
            @click="selectTool('bond-add')"
          >
            Add Bond
          </button>
          <button
            :class="{ active: tool === 'bond-remove' }"
            @click="selectTool('bond-remove')"
          >
            Remove Bond
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Element from './Element.vue'
import Bond from './Bond.vue'
import { Layout, LayoutAtom, LayoutBond } from '@/types/interfaces'
import pt from 'periodic-table'
import { v4 as uuid } from 'uuid'

type Tool = 'move'|'atom-add'|'atom-remove'|
  'bond-add'|'bond-remove'|
  'valence-add'|'valence-remove'

interface Notice { id: string, type: 'error'|'info', text: string }

export default defineComponent({
  components: { Bond, Element },
  name: 'Structure',
  props: {
    shouldVerify: Boolean,
    structure: {
      type: Object as PropType<Layout>,
      required: true
    },
    userEditable: Boolean
  },
  emits: ['updates:structure'],
  data () {
    return {
      size: 100,
      tool: 'move' as Tool,
      currentDrag: null as string|null,
      // Used for touch devices when dragging atoms
      currentTouch: null as Touch|null,
      // Used when user starts to create a bond
      bondStart: null as LayoutAtom|null,
      notices: [] as Notice[],
      invalidReason: ''
    }
  },
  computed: {
    electronAngles () {
      const obj = {} as Record<string, number>
      for (const atom of this.structure.atoms) {
        let avg = null as null|number
        const bonds = this.structure.bonds.filter(b => b.from === atom.id || b.to === atom.id)
        for (const bond of bonds) {
          let toAtom: LayoutAtom
          if (bond.from === atom.id) {
            toAtom = this.getAtom(bond.to) as LayoutAtom
          } else {
            toAtom = this.getAtom(bond.from) as LayoutAtom
          }
          if (avg === null) {
            avg = Math.atan2(atom.y - toAtom.y, atom.x - toAtom.x)
          } else {
            avg = Math.atan2(
              (Math.sin(avg) + Math.sin(Math.atan2(atom.y - toAtom.y, atom.x - toAtom.x))) / 2,
              (Math.cos(avg) + Math.cos(Math.atan2(atom.y - toAtom.y, atom.x - toAtom.x))) / 2
            )
          }
        }
        if (avg === null) {
          obj[atom.id] = 0
        } else {
          obj[atom.id] = avg
        }
      }
      return obj
    },
    isValid () {
      if (!this.shouldVerify) {
        return true
      }
      let totalAtoms = 0
      let requiredAtoms = 0
      for (const atom of this.structure.atoms) {
        const element = pt.symbols[atom.symbol]
        let valenceElectrons = 0
        element.electronicConfiguration.split(' ').forEach(s => {
          if (s.startsWith('[')) {
            return
          }
          valenceElectrons += parseInt(s[s.length - 1])
        })
        requiredAtoms += valenceElectrons

        let bondElectrons = 0
        const bonds = this.structure.bonds.filter(b => b.from === atom.id || b.to === atom.id)

        for (const bond of bonds) {
          switch (bond.type) {
            case 'single':
              bondElectrons += 2
              break
            case 'double':
              bondElectrons += 4
              break
            case 'triple':
              bondElectrons += 6
              break
            case 'quadrouple':
              bondElectrons += 8
              break
          }
        }

        const contributedElectrons = atom.valenceElectrons + bondElectrons

        console.log(element.symbol)
        if (['H', 'He'].includes(element.symbol)) {
          // only wants two in its shell
          if (contributedElectrons !== 2) {
            return `${element.name} doesn't have 2 valence electrons. (Has ${contributedElectrons})`
          }
        } else if (contributedElectrons !== 8) {
          return `${element.name} doesn't have 8 valence electrons. (Has ${contributedElectrons})`
        }
        console.log(atom.valenceElectrons)
        console.log(element.electronicConfiguration)
        totalAtoms += atom.valenceElectrons
      }

      for (const bond of this.structure.bonds) {
        switch (bond.type) {
          case 'single':
            totalAtoms += 2
            break
          case 'double':
            totalAtoms += 4
            break
          case 'triple':
            totalAtoms += 6
            break
          case 'quadrouple':
            totalAtoms += 8
            break
        }
      }

      if (requiredAtoms !== totalAtoms) {
        return `Incorrect number of atoms. (Needs ${requiredAtoms}, has ${totalAtoms})`
      }
      return true
    }
  },
  methods: {
    addAtom (unknownSymbol = false) {
      this.tool = 'move'
      const symbol = prompt((unknownSymbol ? 'Unknown element.' : '') + "What's the symbol of the element to be added?")
      if (symbol === null) {
        return
      }
      const element = pt.symbols[symbol]
      if (element === undefined) {
        this.addAtom(true)
      } else {
        const struct = this.structure
        struct.atoms.push({
          id: uuid(),
          symbol,
          valenceElectrons: 0,
          x: 0,
          y: 0
        })
        this.$emit('updates:structure', struct)
      }
    },
    getAtom (atomId: string) {
      return this.structure.atoms.find(a => a.id === atomId)
    },
    removeAtom (atom: LayoutAtom) {
      const struct = this.structure
      const index = struct.atoms.findIndex(a => a.id === atom.id)
      struct.atoms.splice(index, 1)
      const bonds = struct.bonds.filter(b => b.from === atom.id || b.to === atom.id)
      for (const bond of bonds.map(b => b.id)) {
        const index = struct.bonds.findIndex(b => b.id === bond)
        struct.bonds.splice(index, 1)
      }
      this.$emit('updates:structure', struct)
    },
    addNotice (notice: Notice) {
      if (this.notices.find(n => n.id === notice.id)) {
        return
      }
      this.notices.push(notice)
    },
    removeNotice (noticeId: string) {
      const index = this.notices.findIndex(n => n.id === noticeId)
      if (index === -1) {
        return
      }
      this.notices.splice(index, 1)
    },
    elementClick (atom: LayoutAtom) {
      if (!this.userEditable) {
        return
      }
      const struct = this.structure
      const index = struct.atoms.findIndex(a => a.id === atom.id)
      switch (this.tool) {
        case 'valence-add':
          struct.atoms[index].valenceElectrons = struct.atoms[index].valenceElectrons >= 8 ? 8 : struct.atoms[index].valenceElectrons + 1
          this.$emit('updates:structure', struct)
          break
        case 'valence-remove':
          struct.atoms[index].valenceElectrons = struct.atoms[index].valenceElectrons <= 0 ? 0 : struct.atoms[index].valenceElectrons - 1
          this.$emit('updates:structure', struct)
          break
        case 'atom-remove':
          this.removeAtom(atom)
          break
        case 'bond-add':
          if (this.bondStart === null) {
            this.bondStart = atom
            this.removeNotice('add-first')
            this.addNotice({ id: 'add-second', type: 'info', text: 'Select the second atom in the bond' })
          } else {
            this.removeNotice('add-second')
            const to = atom.id
            const from = this.bondStart.id
            if (from === to) {
              this.bondStart = null
              const id = uuid()
              this.addNotice({ id, type: 'error', text: 'Cannot bond to the same atom' })
              setTimeout(() => this.removeNotice(id), 2500)
              return
            }
            const existingBond = struct.bonds.find(b => (b.from === from && b.to === to) || (b.from === to && b.to === from))
            if (existingBond !== undefined) {
              this.bondStart = null
              const id = uuid()
              this.addNotice({ id, type: 'error', text: 'These atoms are already bonded' })
              setTimeout(() => this.removeNotice(id), 2500)
              return
            }
            const bondType = prompt('What type of bond is this?', 'single')?.toLowerCase() as LayoutBond['type']
            if (['single', 'double', 'triple', 'quaruple'].includes(bondType)) {
              struct.bonds.push({
                id: uuid(),
                from: this.bondStart.id,
                to: atom.id,
                type: bondType
              })
              this.bondStart = null
              this.addNotice({ id: 'add-first', type: 'info', text: 'Select the first atom in the bond.' })
            } else {
              const id = uuid()
              this.addNotice({ id, type: 'error', text: 'Unknown bond type.' })
              setTimeout(() => this.removeNotice(id), 2500)
            }
          }
      }
    },
    elementMouseDown (ev: MouseEvent, atom: LayoutAtom) {
      if (this.tool !== 'move' || this.currentDrag !== null) {
        return
      }
      this.currentDrag = atom.id
    },
    elementMouseMove (ev: MouseEvent) {
      if (this.currentDrag === null) {
        return
      }
      const struct = this.structure
      const index = struct.atoms.findIndex(a => a.id === this.currentDrag)
      struct.atoms[index].x += ev.movementX
      struct.atoms[index].y += ev.movementY
      this.$emit('updates:structure', struct)
    },
    elementMouseUp () {
      this.currentDrag = null
    },
    elementTouchStart (ev: TouchEvent, atom: LayoutAtom) {
      if (this.tool !== 'move' || this.currentTouch !== null) {
        return
      }
      ev.preventDefault()
      this.currentDrag = atom.id
      this.currentTouch = ev.changedTouches[0]
    },
    elementTouchMove (ev: TouchEvent) {
      if (this.currentDrag === null || this.currentTouch === null) {
        return
      }
      ev.preventDefault()
      const touch = Array.from(ev.changedTouches).find(t => t.identifier === this.currentTouch?.identifier)
      if (touch === undefined) {
        return
      }

      const deltaX = touch.clientX - this.currentTouch.clientX
      const deltaY = touch.clientY - this.currentTouch.clientY

      this.currentTouch = touch

      const struct = this.structure
      const index = struct.atoms.findIndex(a => a.id === this.currentDrag)

      struct.atoms[index].x += deltaX
      struct.atoms[index].y += deltaY

      this.$emit('updates:structure', struct)
    },
    elementTouchEnd (ev: TouchEvent) {
      if (this.currentDrag === null || this.currentTouch === null) {
        return
      }
      ev.preventDefault()
      const touch = Array.from(ev.changedTouches).find(t => t.identifier === this.currentTouch?.identifier)
      if (touch === undefined) {
        return
      }
      this.currentDrag = null
      this.currentTouch = null
    },
    bondClick (bond: LayoutBond) {
      const struct = this.structure
      const index = struct.bonds.findIndex(b => b.id === bond.id)
      struct.bonds.splice(index, 1)
      this.$emit('updates:structure', struct)
    },
    selectTool (tool: Tool) {
      this.bondStart = null
      this.removeNotice('add-first')
      this.removeNotice('add-second')
      if (this.tool === tool) {
        this.tool = 'move'
      } else {
        this.tool = tool
        if (tool === 'bond-add') {
          this.bondStart = null
          this.addNotice({ id: 'add-first', type: 'info', text: 'Select the first atom in the bond.' })
        }
      }
    }
  }
})
</script>

<style lang="scss">
.structure-wrapper {
  display: grid;
  grid-template-rows: 1fr auto auto;
}

.structure {
  width: 100%;
  height: 100%;
  fill: currentColor;

  &.tool-move {
    .element {
      cursor: move;
    }
  }

  &.tool-valence-add, &.tool-valence-remove {
    .element {
      cursor: pointer;
    }
  }

  &.tool-bond-remove {
    .bond {
      cursor: pointer;
    }
  }
}

.controls {
  display: flex;
  justify-content: center;
  gap: 1rem;

  .group {
    display: grid;
    gap: 0.5rem;
    grid-template-rows: auto 1fr;

    > span {
      border-bottom: 1px var(--text) solid;
      text-align: center;
    }
  }
}

.notice {
  margin-bottom: 1em;
  padding: 0.5em;

  &.info {
    background-color: var(--watermelon);
  }
  &.error {
    background-color: var(--peach);
  }
}

@media screen and (max-width: 800px){
  .controls {
    flex-direction: column;
  }

  .group > .controls {
    flex-direction: row;
  }
}
</style>
