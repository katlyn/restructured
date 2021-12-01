<template>
  <Nav />
  <router-view id="main" />
</template>

<script>
import { defineComponent } from 'vue'
import Nav from '@/components/Nav.vue'

export default defineComponent({
  name: 'Home',
  components: {
    Nav
  },
  watch: {
    $route: {
      handler () {
        const body = document.body
        if (this.$router.currentRoute.value.path.includes('presentation')) {
          body.classList.add('hide-scrollbar')
        } else {
          body.classList.remove('hide-scrollbar')
        }
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss">
@import '@/assets/style.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: grid;
  grid-template-rows: 4rem 1fr;
  min-height: 100vh;
}

#main {
  margin: 1em;
}
</style>
