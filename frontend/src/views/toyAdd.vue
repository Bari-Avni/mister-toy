<template>
  <section class="toy-add">
    <form @submit.prevent="addToy" class="add-toy flex column align-center">
        <h2>Add new Toy:</h2>
        <label>Toy name: <input type="text" v-model="toyToEdit.name"></label>
        <label>Toy Price: <input type="number" v-model.number="toyToEdit.price"></label>
        <label>Toy type:
            <select v-model="toyToEdit.type" >
                <option value="Funny">Funny</option>
                <option value="Adult">Adult</option>
                <option value="Educational">Educational</option>
            </select>
        </label>
        <label>In Stock:
            <input type="checkbox" name="checkbox" @change="toggleInStock" :checked="toyToEdit.inStock"/>
        </label>
        <button>Add</button>
    </form>
  </section>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import { showMsg } from '../services/eventBus.service.js'

export default {
  data() {
    return {
       toyToEdit: toyService.getEmptyToy()
    };
  },
  methods:{
      addToy() {
            const toy = { ...this.toyToEdit }
            console.log('toy add', toy);
            this.$store.dispatch({ type: 'saveToy', toy })
                .then(() => {
                    showMsg('Toy added')
                    this.toyToEdit = toyService.getEmptyToy();
                    this.$router.push('/toy')
                })
                .catch(err => {
                    showMsg('Cannot add toy', 'danger')
                })
        },
        toggleInStock() {
      this.toyToEdit.inStock = !this.toyToEdit.inStock;
    },
  },
};
</script>