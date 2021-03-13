import { toyService } from '../services/toy.service.js'

export const toyStore = {
    strict: true,
    state: {
        // toys: toyService.query(),
        toys: [],
        filterBy: {
            txt: "",
            type: "all",
            inStock: "all",
            sortBy: "name",
          },
        currToy: null
    },
    getters: {
        toysForDisplay(state) {
            // const regex = new RegExp(state.filterBy.txt, 'i')
            // return state.toys.filter(toy => {
            //     const containsTxt = regex.test(toy.name);

            //     if (!state.filterBy.complete) return containsTxt
            //     const isComplete = (state.filterBy.complete === 'true');
            //     const matchesComplete = isComplete ? toy.completedAt : !toy.completedAt;
            //     return containsTxt && matchesComplete
            // })
            return state.toys
        },
        donePrecentage(state) {
            const doneToysAmount = state.toys.filter(toy => toy.completedAt).length;
            if (!doneToysAmount) return
            return (doneToysAmount / state.toys.length) * 100
        },
        currToyDateToDisplay(state) {
            if (state.currToy.completedAt) return new Date(state.currToy.completedAt).toLocaleDateString('he-IS')
        }
    },
    mutations: {
        // toggleCompleted(state, payload){
        //     const toy = payload.toy;
        //     let currTime = null;
        //     if(!toy.completedAt) currTime = Date.now();
        //     toyService.toggleCompleted(toy._id, currTime);
        //     toy.completedAt = currTime;
        // },
        removeToyById(state, payload) {
            const id = payload.id
            // toyService.remove(id);
            const idx = state.toys.findIndex(toy => toy._id === id)
            state.toys.splice(idx, 1);
        },
        addToy(state, { toy }) {
            // const toy = payload.toy;
            // toyService.save(toy);
            state.toys.unshift(toy);
        },
        setFilter(state, payload) {
            const filterBy = { ...payload.filterBy }
            state.filterBy = filterBy;
        },
        getToyById(state, payload) {
            state.currToy = state.toys.find(toy => {
                return payload.toyId === toy._id
            });

        },
        // update toy
        saveChanges(state, { toy }) {
            // const updatedToy = JSON.parse(JSON.stringify(payload.updatedToy));
            // toyService.save(updatedToy);
            const idx = state.toys.findIndex(t => t._id === toy._id)
            state.toys.splice(idx, 1, toy)
        },
        setToys(state, payload) {
            state.toys = payload.toys;
        }
    },
    actions: {
        removeToyById(context, payload) {
            console.log('payload', payload);
            return toyService.remove(payload.id)
                .then(() => {
                    context.commit(payload)
                })
                .catch(err => {
                    console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
                })
        },
        saveToy(context, { toy }) {
            // TODO: support EDIT
            console.log('toy', toy);
            const type = (toy._id) ? 'saveChanges' : 'addToy';
            return toyService.save(toy)
                .then(savedToy => {
                    context.commit({ type, toy: savedToy })
                })
                .catch(err => {
                    console.log('Store: Cannot save toy', err);
                    throw new Error('Cannot save toy');
                })
        },
        loadToys(context) {
            toyService.query()
                .then(toys => {
                    context.commit({ type: 'setToys', toys });
                })
                .catch(err => {
                    console.log('Store: Cannot load toys', err);
                    throw new Error('Cannot load toys');
                })
        },
        setFilter(context, payload) {
            console.log('payload', payload);
            toyService.query(payload.filterBy)
                .then(toys => {
                    context.commit({ type: 'setToys', toys })
                })
        }
    }
}

// export const myStore = new Vuex.Store(options);