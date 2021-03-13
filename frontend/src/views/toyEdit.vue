<template>
    <section >
        <form @submit.prevent="saveToyChanges" class="toy-edit flex column">
            <label>Toy: <input type="text" v-model="toyToEdit.name"></label>
            <label>Price: <input type="number" v-model.number="toyToEdit.price"></label>
            <label>Type:
              <select v-model="toyToEdit.type" >
                <option value="Funny">Funny</option>
                <option value="Adult">Adult</option>
                <option value="Educational">Educational</option>
              </select>
            </label>
            <label>In Stock:
              <input type="checkbox" name="checkbox" @change="toggleInStock" :checked="toyToEdit.inStock"/>
            </label>
            <div class="btn-container">
                <button class="btn-save">Save</button>
                <router-link to="/toy" class="btn">Back</router-link>
            </div> 
        </form>
    </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { showMsg } from "../services/eventBus.service.js";

export default {
  name: "toy-edit",
  data() {
    return {
      toyToEdit: toyService.getEmptyToy(),
    };
  },
  created() {
    const toyId = this.$route.params.toyId;
    toyService.getToyById(toyId).then((toy) => {
      // console.log('toy', toy);
      this.toyToEdit = JSON.parse(JSON.stringify(toy));
    });
    // this.toyToEdit = JSON.parse(JSON.stringify(toyService.getToyById(toyId)));
  },
  methods: {
    saveToyChanges() {
      // this.$store.commit({ type: 'saveChanges', updatedToy: this.toyToEdit })
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToEdit })
        .then(() => {
          showMsg("Toy saved");
          this.toyToEdit = toyService.getEmptyToy();
        })
        .catch((err) => {
          showMsg("Cannot save toy", "danger");
        });
      this.$router.push("/toy");
    },
    toggleInStock() {
      this.toyToEdit.inStock = !this.toyToEdit.inStock;
    },
  },
  computed: {
    // dateToDisplay() {
    //   if (this.toyToEdit.completedAt)
    //     return (
    //       "Completed at: " +
    //       new Date(this.toyToEdit.completedAt).toLocaleDateString("he-IS")
    //     );
    //   return "Not completed yet";
    // },
  },
};
</script>