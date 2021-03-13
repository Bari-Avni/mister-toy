<template>
  <section class="toy-preview flex">
    <p>Toy: {{ toy.name }}</p>
    <p>Price: ${{ toy.price }}</p>
    <p>Type: {{ toy.type }}</p>
    <p>In Stock: {{ toy.inStock }}</p>
  </section>
</template>

<script>
export default {
  props: ["toy"],
};
</script>