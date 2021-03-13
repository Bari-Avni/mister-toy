<template>
  <section class="toy-details flex column align-center">
    <h2><span>Toy: </span>{{ toy.name }}</h2>
    <h2><span>Price: $</span>{{ toy.price }}</h2>
    <h2><span>Type: </span>{{ toy.type }}</h2>
    <h2><span>In Stock: </span>{{ toy.inStock }}</h2>
    <h2><span>Created at: </span> {{ date }}</h2>
    <router-link to="/toy" class="btn">Back</router-link>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";

export default {
  data() {
    return {
      toy: null,
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    this.toy = toyService.getToyById(toyId).then((toy) => {
      this.toy = toy;
    });
  },
  computed: {
    date() {
      if (this.toy.createdAt)
        return new Date(this.toy.createdAt).toLocaleDateString("he-IS");
    },
  },
};
</script>