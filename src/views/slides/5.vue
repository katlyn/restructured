<template>
  <div class="presentation">
    <div class="content">
      <h2>What do I do?</h2>
      <h1 class="fade-in">Build my own!</h1>
    </div>
    <div class="slide-controls">
      <RouterLink to="/presentation/4">⮜ Previous</RouterLink>
      <RouterLink to="/presentation/6">Next ⮞</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
