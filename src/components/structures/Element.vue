<template>
  <svg
      viewbox="0 0 300 300"
      :width="size" :height="size"
      class="element"
    >

    <text
      v-if="element"
      class="symbol"
      x="50%" y="63%"
      :font-size="fontSize"
      text-anchor="middle"
      :fill="'#' + element.cpkHexColor"
    >
      {{ element.symbol }}
    </text>
    <text
      v-else
      class="symbol error"
      x="50%" y="63%"
      :font-size="fontSize"
      text-anchor="middle"
      fill="#000"
    >
      {{ symbol }}
    </text>

    <g class="electron-pairs" :transform="`rotate(${electronAngle * (180 / Math.PI) + 22.5 * (valenceElectrons - 2) }, ${size / 2}, ${size / 2})`">
      <circle cx="85%" cy="63.3333333%" r="5%" :class="{ filled: valenceElectrons >= 1 }" />
      <circle cx="85%" cy="36.6666667%" r="5%" :class="{ filled: valenceElectrons >= 2 }" />

      <circle cx="63.3333333%" cy="15%" r="5%" :class="{ filled: valenceElectrons >= 3 }" />
      <circle cx="36.6666667%" cy="15%" r="5%" :class="{ filled: valenceElectrons >= 4 }" />

      <circle cx="15%" cy="36.6666667%" r="5%" :class="{ filled: valenceElectrons >= 5 }"/>
      <circle cx="15%" cy="63.3333333%" r="5%" :class="{ filled: valenceElectrons >= 6 }" />

      <circle cx="36.6666667%" cy="85%" r="5%" :class="{ filled: valenceElectrons >= 7 }" />
      <circle cx="63.3333333%" cy="85%" r="5%" :class="{ filled: valenceElectrons >= 8 }" />
    </g>
    <circle cx="50%" cy="50%" r="50%" fill="transparent"/>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pt, { Element } from 'periodic-table'

export default defineComponent({
  name: 'Element',
  props: {
    userEditable: Boolean,
    symbol: {
      type: String,
      required: true
    },
    valenceElectrons: {
      type: Number,
      required: true
    },
    electronAngle: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      elementHeight: 0
    }
  },
  computed: {
    element (): Element {
      return pt.symbols[this.symbol]
    },
    fontSize (): string {
      return (this.size * 110 / 300).toString()
    }
  },
  methods: {}
})
</script>

<style lang="scss">
  .element {
    font-size: 10%;
    user-select: none;

    text.symbol {
      paint-order: stroke;
      stroke: currentColor;
      stroke-width: 2pt;
    }

    .electron-pairs {
      fill: none;
      stroke: currentColor;
      transition: stroke-width 0.1s linear;
      stroke-width: 0;

      .filled {
        fill: currentColor;
        stroke-width: 1pt;
      }
    }
  }

  .user-editable .element:hover {
    .electron-pairs {
      stroke-width: 1pt;
    }
  }
</style>
