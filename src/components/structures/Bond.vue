<template>
  <svg
    :viewbox="`${x1} ${y1} ${x2} ${y2}`"
    class="bond"
    :style="{ strokeWidth: size / 20 }"
  >

    <line :x1="x1" :y1="y1" :x2="x2" :y2="y2" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LayoutAtom } from '@/types/interfaces'

export default defineComponent({
  name: 'Bond',
  props: {
    from: {
      type: Object as PropType<LayoutAtom>,
      required: true
    },
    to: {
      type: Object as PropType<LayoutAtom>,
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
    degradation (): number {
      return Math.atan2(this.from.y - this.to.y, this.from.x - this.to.x)
    },
    x1 () {
      return this.from.x + this.size / 2 - this.size * 0.4 * Math.cos(this.degradation)
    },
    y1 () {
      return this.from.y + this.size / 2 - this.size * 0.4 * Math.sin(this.degradation)
    },
    x2 () {
      return this.to.x + this.size / 2 - this.size * 0.4 * Math.cos(this.degradation + 3.14159)
    },
    y2 () {
      return this.to.y + this.size / 2 - this.size * 0.4 * Math.sin(this.degradation + 3.14159)
    }
  },
  methods: {}
})
</script>

<style lang="scss">
.bond {
  stroke: var(--text);
  stroke-linecap: round;
}
</style>
