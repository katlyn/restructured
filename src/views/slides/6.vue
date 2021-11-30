<template>
  <div class="presentation">
    <div class="content">
      <Structure class="main-struct" v-model:structure="structure" />
    </div>
    <div class="slide-controls">
      <RouterLink to="/presentation/5">⮜ Previous</RouterLink>
      <RouterLink to="/presentation/7">Next ⮞</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Structure from '@/components/structures/Structure.vue'
export default defineComponent({
  name: 'Home',
  data () {
    return {
      structure: {
        atoms: [],
        bonds: []
      }
    }
  },
  components: {
    Structure
  }
})
</script>
