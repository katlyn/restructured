<template>
  <div class="home">
    <Structure class="main-struct" v-model:structure="structure" shouldVerify userEditable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Structure from '@/components/structures/Structure.vue' // @ is an alias to /src
// import { dihydrogenMonoxide, sulfurTrioxide } from '@/demoCompounds'

export default defineComponent({
  name: 'Home',
  data () {
    return {
      structure: { atoms: [], bonds: [] }
    }
  },
  components: {
    Structure
  }
})
</script>
