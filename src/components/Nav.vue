<template>
  <header>
    <RouterLink to="/" class="main-title">Restructured</RouterLink>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/presentation">Presentation</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  border-bottom: var(--light-secondary) solid 2px;
  display: flex;
  align-items: center;
  padding: 1em;
  justify-content: space-between;
}

nav {
  display: flex;
  gap: 1em;
}

.main-title {
  font-size: 1.5em;
  text-decoration-thickness: 3px;
}

a {
  color: var(--dark);
  text-decoration-thickness: 2px;
}

</style>
