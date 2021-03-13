<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <hello-world msg="Welcome to Your Vue.js App"/>
  <chart v-if="false" class="chart" />
  </div>
</template>

<script>
// @ is an alias to /src
import helloWorld from '@/cmps/helloWorld.vue'
import chart from '../views/chart.vue'

export default {
  name: 'home',
  components: {
    helloWorld,
    chart
  }
}
</script>
