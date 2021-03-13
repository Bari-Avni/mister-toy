<template>
  <section>
    <ul class="toy-list clean-list">
      <li
        v-for="toy in toys"
        :key="toy._id"
        class="flex align-center"
      >
        <toy-preview
          :toy="toy"
        />
        <button @click="removeToy(toy)">X</button>

        <router-link class="btn"
          :to="'/toy/details/' + toy._id"
          >Details</router-link
        >
        <router-link class="btn"
          :to="'/toy/edit/' + toy._id"
          >Edit</router-link
        >
      </li>
    </ul>
  </section>
</template>

<script>
import toyPreview from "./toyPreview.vue";

export default {
  props: ["toys"],
  methods: {
    // toggleCompleted(toy) {
    //   toy = { ...toy };
    //   if (toy.completedAt) toy.completedAt = null;
    //   else toy.completedAt = Date.now();

    //   this.$emit("saveCanges", toy);
    //   // this.$emit('toggleCompleted', toy);
    // },
    removeToy(toy) {
      this.$emit("removeToy", toy);
    },
  },

  components: {
    toyPreview,
  },
};
</script>
