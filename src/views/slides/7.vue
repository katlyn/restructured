<template>
  <div class="presentation">
    <div class="content">
      <Structure class="main-struct" v-model:structure="structure" />
    </div>
    <div class="slide-controls">
      <RouterLink to="/presentation/6">⮜ Previous</RouterLink>
      <RouterLink to="/presentation/8">Next ⮞</RouterLink>
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
        atoms: [
          {
            id: '0fe49d4e-7c66-430c-9947-a8a39906bdcf',
            symbol: 'H',
            valenceElectrons: 0,
            x: 0,
            y: 0
          },
          {
            id: '07578c1a-56ea-4b59-a901-4ba1bd389336',
            symbol: 'H',
            valenceElectrons: 0,
            x: 200,
            y: 0
          },
          {
            id: '976f24ee-aaee-4fdd-89f4-6f610e66318b',
            symbol: 'O',
            valenceElectrons: 0,
            x: 100,
            y: 0
          }
        ],
        bonds: []
      }
    }
  },
  components: {
    Structure
  }
})
</script>
