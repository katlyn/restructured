<template>
  <div class="home">
    <Structure class="main-struct" v-model:structure="structure" userEditable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Structure from '@/components/structures/Structure.vue' // @ is an alias to /src
import { Layout } from '@/types/interfaces'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      structure: {
        atoms: [
          {
            id: '0',
            symbol: 'H',
            x: 0,
            y: 50,
            valenceElectrons: 0
          },
          {
            id: '1',
            symbol: 'O',
            x: 100,
            y: 0,
            valenceElectrons: 4
          },
          {
            id: '2',
            symbol: 'H',
            x: 200,
            y: 50,
            valenceElectrons: 0
          }
        ],
        bonds: [
          {
            id: '0',
            from: '0',
            to: '1',
            type: 'single'
          },
          {
            id: '1',
            from: '1',
            to: '2',
            type: 'single'
          },
          {
            id: '2',
            from: '0',
            to: '2',
            type: 'single'
          }
        ]
      } as Layout
    }
  },
  components: {
    Structure
  }
})
</script>

<style lang="scss">
.main-struct {
  width: 100%;
  height: 100%;
}
</style>
