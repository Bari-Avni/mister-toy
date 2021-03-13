<template>
  <form class="toy-filter flex space-evenly">
    <div class="flex column">
      <label>Search a toy:</label>
      <input
        type="text"
        v-model="filterBy.txt"
        @input="setFilter"
        placeholder="search toy"
      />
    </div>
    <div class="flex column">
      <label>Filter by type:</label>
      <select v-model="filterBy.type" @change="setFilter">
        <option value="all" selected>All</option>
        <option value="Funny">Funny</option>
        <option value="Adult">Adult</option>
        <option value="Educational">Educational</option>
      </select>
    </div>
    <div class="flex column">
      <label>Filter by stock:</label>
      <select v-model="filterBy.inStock" @change="setFilter">
        <option value="all">All</option>
        <option value="true">In Stock</option>
        <option value="false">Out of Stock</option>
      </select>
    </div>
    <div class="flex column">
      <label>Sort by:</label>
      <select v-model="filterBy.sortBy" @change="setFilter">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        type: "all",
        inStock: "all",
        sortBy: "name",
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", this.filterBy);
    },
  },
};
</script>