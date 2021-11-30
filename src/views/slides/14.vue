<template>
  <div class="presentation">
    <div class="content">
      <Structure class="main-struct" v-model:structure="structure" userEditable shouldVerify />
    </div>
    <div class="slide-controls">
      <RouterLink to="/presentation/13">⮜ Previous</RouterLink>
      <RouterLink to="/presentation/15">Next ⮞</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Structure from '@/components/structures/Structure.vue'
import { presentationCompound } from '@/demoCompounds'
export default defineComponent({
  name: 'Home',
  data () {
    return {
      structure: presentationCompound
    }
  },
  components: {
    Structure
  }
})
</script>
