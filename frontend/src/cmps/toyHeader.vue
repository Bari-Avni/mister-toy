<template>
  <section class="todo-header flex space-evenly">
    <div class="flex">
      <h2 class="logo">Mister Toy</h2>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/chart">Chart</router-link> |
      <router-link to="/toy">Toys</router-link>
    </nav>
  </section>
</template>

<script>
export default {
  computed: {
  },
};
</script>