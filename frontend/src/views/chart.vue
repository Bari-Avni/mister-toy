<script>
import { Pie } from "vue-chartjs";

export default {
  extends: Pie,
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ["Adult", "Educational", "Funny"],
      datasets: [
        {
          label: "Price per Toy type",
          backgroundColor: "#f87979",
          data: [40, 20, 12],
        },
      ],
    });
  },
  computed: {
    toys() {
      return this.$store.getters.toysForDisplay;
    },
  },
};
</script>
