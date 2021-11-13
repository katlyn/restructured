<template>
  <svg
    class="bond"
    :style="{ strokeWidth: size / 20 }"
  >
    <line v-if="type === 'single'" :x1="points.x1" :y1="points.y1" :x2="points.x2" :y2="points.y2" />

    <g v-else-if="type === 'double' || type === 'quadrouple'">
      <line :x1="points.x1 + offset.x / 2" :y1="points.y1 + offset.y / 2" :x2="points.x2 + offset.x / 2" :y2="points.y2 + offset.y / 2" />
      <line :x1="points.x1 - offset.x / 2" :y1="points.y1 - offset.y / 2" :x2="points.x2 - offset.x / 2" :y2="points.y2 - offset.y / 2" />
    </g>

    <g v-else-if="type === 'triple'">
      <line :x1="points.x1 + offset.x" :y1="points.y1 + offset.y" :x2="points.x2 + offset.x" :y2="points.y2 + offset.y" />
      <line :x1="points.x1" :y1="points.y1" :x2="points.x2" :y2="points.y2" />
      <line :x1="points.x1 - offset.x" :y1="points.y1 - offset.y" :x2="points.x2 - offset.x" :y2="points.y2 - offset.y" />
    </g>
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
    type: {
      type: String,
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
    points () {
      return {
        x1: this.from.x + this.size / 2 - this.size * 0.4 * Math.cos(this.degradation),
        y1: this.from.y + this.size / 2 - this.size * 0.4 * Math.sin(this.degradation),
        x2: this.to.x + this.size / 2 - this.size * 0.4 * Math.cos(this.degradation + 3.14159),
        y2: this.to.y + this.size / 2 - this.size * 0.4 * Math.sin(this.degradation + 3.14159)
      }
    },
    offset () {
      return {
        x: this.size / 10 * Math.cos(this.degradation + 1.5708),
        y: this.size / 10 * Math.sin(this.degradation + 1.5708)
      }
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
