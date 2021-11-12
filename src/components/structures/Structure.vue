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
        @click.left="elementClick(atom)"
        @mousedown.left="elementMouseDown($event, atom)"
        @touchstart="elementTouchStart($event, atom)"
      />

      <Bond
        v-for="bond in structure.bonds"
        :key="bond.id"
        :from="getAtom(bond.from)"
        :to="getAtom(bond.to)"
        :size="size"
      />
    </svg>
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
            :class="{ active: tool === 'bond-add-single' }"
            @click="selectTool('bond-add-single')"
          >
            Add Single Bond
          </button>
          <button
            :class="{ active: tool === 'bond-add-double' }"
            @click="selectTool('bond-add-double')"
          >
            Add Double Bond
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
import { Layout, LayoutAtom } from '@/types/interfaces'

type Tool = null|
  'move'|'atom-add'|'atom-remove'|
  'bond-add-single'|'bond-add-double'|'bond-remove'|
  'valence-add'|'valence-remove'

export default defineComponent({
  components: { Bond, Element },
  name: 'Structure',
  props: {
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
      tool: null as Tool,
      currentDrag: null as number|null,
      // Used for touch devices when dragging atoms
      currentTouch: null as Touch|null
    }
  },
  methods: {
    getAtom (atomId: number) {
      return this.structure.atoms.find(a => a.id === atomId)
    },
    elementClick (atom: LayoutAtom) {
      const struct = this.structure
      const index = struct.atoms.findIndex(a => a.id === atom.id)
      switch (this.tool) {
        case 'valence-add':
          struct.atoms[index].valenceElectrons = struct.atoms[index].valenceElectrons >= 8 ? 8 : struct.atoms[index].valenceElectrons + 1
          break
        case 'valence-remove':
          struct.atoms[index].valenceElectrons = struct.atoms[index].valenceElectrons <= 0 ? 0 : struct.atoms[index].valenceElectrons - 1
      }
      this.$emit('updates:structure', struct)
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
    selectTool (tool: Tool) {
      if (this.tool === tool) {
        this.tool = null
      } else {
        this.tool = tool
      }
    }
  }
})
</script>

<style lang="scss">
.structure-wrapper {
  display: grid;
  grid-template-rows: 1fr auto;
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

@media screen and (max-width: 800px){
  .controls {
    flex-direction: column;
  }

  .group > .controls {
    flex-direction: row;
  }
}
</style>
