<template>
  <div class="container">
    <userMsg/>
    <toyHeader/>
    <router-view />
  </div>
</template>

<script>
import userMsg from './cmps/userMsg.vue'
import toyHeader from './cmps/toyHeader.vue'

export default {
  data() {
    return {
      user: { fullname: "Babus" },
    };
  },
  created() {
    console.log("Vue App was created!!!");
    this.$store.dispatch({ type: "loadToys" });
  },
  components: {
    toyHeader,
    userMsg,
  },
};
</script>

