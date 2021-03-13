import { utilService } from '../services/util.service.js';
// import { storageService } from './storage.service.js';
// import { asyncStorageService } from './async-storage.service.js';
// import axios from 'axios'
import { httpService } from './http.service.js'

const KEY = 'toys';
// const TOY_URL = 'http://localhost:3030/api/toy/';
const TOY_URL = (process.env.NODE_ENV !== 'development')
    ? '/api/toy'
    : '//localhost:3030/api/toy/';

var gFilterBy = { txt: '', pageIdx: 0 }
// var gToys = _createToys();
// var gToys = _createDataToys();

export const toyService = {
    query,
    // toggleCompleted,
    remove,
    getEmptyToy,
    save,
    getToyById,
    setFilter,
    nextPage
};

function setFilter(filterBy) {
    gFilterBy.txt = filterBy.txt
    gFilterBy.pageIdx = 0;
}
function nextPage() {
    gFilterBy.pageIdx++
}

function query(filterBy) {
    //     // return asyncStorageService.query(KEY)
    //     // return JSON.parse(JSON.stringify(gToys));
    //     return axios.get(TOY_URL, { params: filterBy })
    //         .then(res => res.data)
    return httpService.get('toy', { params: filterBy })
}

function remove(id) {
    // return asyncStorageService.remove(KEY, id)
    // const idx = gToys.find(toy => toy._id === id);
    // gToys.splice(idx,1);
    // _saveToysToStorage(gToys);
    // return axios.delete(TOY_URL + id)
    //     .then(res => res.data)
    return httpService.delete('toy/' + id)
}

function save(toy) {
    // const savedToy = (toy._id) ? asyncStorageService.put(KEY, toy) : asyncStorageService.post(KEY, toy)
    // return savedToy;
    // if(newToy._id){
    //     const idx = gToys.find(toy => toy._id === newToy._id);
    //     if(idx<0) return;
    //     gToys.splice(idx,1,newToy);
    // }else{ 
    //     newToy._id = utilService.makeId();
    //     gToys.unshift(newToy);}
    // _saveToysToStorage(gToys);
    // if (toy._id) {
    //     return axios.put(TOY_URL + toy._id, toy)
    //         .then(res => res.data)
    // } else {
    //     return axios.post(TOY_URL, toy)
    //         .then(res => res.data)
    // }
    if (toy._id) {
        return httpService.put('toy/' + toy._id, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        type: '',
        createdAt: null,
        inStock: false
    }
}

function getToyById(id) {
    // return asyncStorageService.get(KEY, id)
    // return gToys.find(toy => toy._id === toyId)
    // return axios.get(TOY_URL + id).then(res => res.data)
    return httpService.get('toy/' + id)
}

function _createToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    // let toys = storageService.load(TODO_KEY);
    if (!toys || !toys.length) {
        toys = [
            { txt: 'Buy lots of icecream', completedAt: 152347895021110, _id: utilService.makeId() },
            { txt: 'Eat all this icecream', completedAt: 152347895032643, _id: utilService.makeId() },
            { txt: 'Get more icecream', completedAt: null, _id: utilService.makeId() },
            { txt: 'Eat more icecream', completedAt: null, _id: utilService.makeId() },
            { txt: 'Buy other flavors of icecream', completedAt: null, _id: utilService.makeId() },
            { txt: 'Eat them too', completedAt: null, _id: utilService.makeId() },
            { txt: 'Find a shrink', completedAt: null, _id: utilService.makeId() },
        ];
        localStorage.setItem(KEY, JSON.stringify(toys))

    }
    // _saveToysToStorage(toys)
    return toys;
}

function _createDataToys() {
    var toys = JSON.parse(localStorage.getItem(KEY))
    // let toys = storageService.load(TODO_KEY);
    if (!toys || !toys.length) {
        toys = [
            {
                "_id": utilService.makeId(),
                "name": "facilisis vestibulum",
                "price": 52,
                "type": "Educational",
                "createdAt": 33321111111,
                "inStock": false
            },
            {
                "_id": utilService.makeId(),
                "name": "nunc massa",
                "price": 79,
                "type": "Funny",
                "createdAt": 33326661111,
                "inStock": true
            },
            {
                "_id": utilService.makeId(),
                "name": "nec suspendisse",
                "price": 7,
                "type": "Adult",
                "createdAt": 33324441111,
                "inStock": true
            },
            {
                "_id": utilService.makeId(),
                "name": "sit massa",
                "price": 90,
                "type": "Educational",
                "createdAt": 33322221111,
                "inStock": false
            },
        ];
        localStorage.setItem(KEY, JSON.stringify(toys))

    }
    // _saveToysToStorage(toys)
    return toys;
}


// function _saveToysToStorage(value){
//     storageService.store(TODO_KEY, value);
// }
