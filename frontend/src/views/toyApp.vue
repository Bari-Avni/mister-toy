<template>
  <section class="toy-app main-container">
    <router-link to="/toy/add" class="btn">+ Add Toy</router-link>
    <toy-filter @setFilter="setFilter" />
    <toy-list
      :toys="toys"
      @saveCanges="saveChanges"
      @removeToy="removeToy"
    />
  </section>
</template>

<script>
import toyList from '../cmps/toyList.vue'
import toyFilter from '../cmps/toyFilter.vue'
import { toyService } from '../services/toy.service.js'
import { showMsg } from '../services/eventBus.service.js'

export default {
    data() {
        return {
            toyToEdit: toyService.getEmptyToy(),
        }
    },
    methods: {
        removeToy(toy) {
            // this.$store.commit({type:'removeToyById', id:toy._id})
            this.$store.dispatch({ type: 'removeToyById', id: toy._id })
                .then(() => {
                    showMsg('Toy removed')
                })
                .catch(err => {
                    showMsg('Cannot remove toy', 'danger')
                })
        },
        setFilter(filterBy) {
            // this.$store.commit({ type: 'setFilter', filterBy })
            this.$store.dispatch({ type: 'setFilter', filterBy: {...filterBy} })
        },
        saveChanges(toy) {
            // this.$store.commit({ type: 'saveChanges', updatedToy: toy })
            this.$store.dispatch({ type: 'saveToy', toy })
                .then(() => {
                    showMsg('Toy saved')
                    this.toyToEdit = toyService.getEmptyToy();
                })
                .catch(err => {
                    showMsg('Cannot save toy', 'danger')
                })
        }
    },
    computed: {
        toys() {
            return this.$store.getters.toysForDisplay
        },
    },
    components: {
        toyList,
        toyFilter
    }
}
</script>