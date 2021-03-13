// const gToys = require('../../data/toy.json')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const PAGE_SIZE = 4;

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    console.log('toys');
    try {
        const collection = await dbService.getCollection('toy')
        const toys = await collection.find().toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

// function query(filterBy) {
//     console.log('filterBy', filterBy);
//     if (!Object.keys(filterBy).length) return Promise.resolve(gToys); 
//     const regex = new RegExp(filterBy.txt, 'i')
//     var toys = gToys.filter(toy => {
//         if (filterBy.type === "all" && filterBy.inStock === "all")
//         return regex.test(toy.name)
//         else if (filterBy.type === "all" && filterBy.inStock != "all") 
//         return regex.test(toy.name) && (JSON.stringify(toy.inStock) === filterBy.inStock)
//         else if (filterBy.type != "all" && filterBy.inStock === "all")
//         return regex.test(toy.name) && (toy.type === filterBy.type)
//         else return regex.test(toy.name) && (toy.type === filterBy.type) && (JSON.stringify(toy.inStock) === filterBy.inStock)
//     })


//         console.log('filtered toys',toys)

//         // var toys = gToys
//         if (filterBy.sortBy === "name") {
//             console.log('sorting by name') 
//             console.log('toys', toys);       
//             toys.sort((toy1,toy2) => {return ('' + toy1.name).localeCompare(toy2.name)})
//         }else if (filterBy.sortBy === "price") {
//             toys.sort((toy1,toy2) => {return toy1.price - toy2.price})
//         }

//     // const startIdx = filterBy.pageIdx * PAGE_SIZE
//     // toys = toys.slice(startIdx, startIdx + PAGE_SIZE)

//     return Promise.resolve(toys);
//     }

async function getById(toyId) {
    // const toy = gToys.find(toy => toy._id === toyId)
    // return Promise.resolve(toy);
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        // delete toy.password

        // toy.givenReviews = await reviewService.query({ bytoyId: ObjectId(toy._id) })
        // toy.givenReviews = toy.givenReviews.map(review => {
        //     delete review.bytoy
        //     return review
        // })

        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
            createdAt: toy.createdAt
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            inStock: toy.inStock,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

// async function save(toy) {
//     if (toy._id) {
//         try {
//             console.log('save update', toy);
//             const collection = await dbService.getCollection('toy')
//             await collection.updateOne({ '_id': ObjectId(toyId) }, { $set: toy })
//             return toy;
//         } catch (err) {
//             logger.error(`cannot update toy ${toy._id}`, err)
//             throw err
//         }
//         // const idx = gToys.findIndex(b => b._id === toy._id)
//         // if (idx < 0) return Promise.reject('No such toy', toy._id)
//         // gToys.splice(idx, 1, toy)
//     } else {
//         toy._id = _makeId()
//         toy.createdAt = Date.now()
//         gToys.unshift(toy)

//     }
//     // return _saveToysToFile()
//     //     .then(() => toy)
// }

async function remove(toyId) {
    // const idx = gToys.findIndex(toy => toy._id === toyId)
    // if (idx === -1) return Promise.reject('No Such Toy')
    // gToys.splice(idx, 1)
    // return _saveToysToFile();
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}


module.exports = {
    query,
    getById,
    // save,
    update,
    add,
    remove
}

function _buildCriteria(filterBy) {
    const criteria = {}
    return criteria
}


function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const fs = require('fs')
        fs.writeFile('data/toy.json', JSON.stringify(gToys, null, 2), (err) => {
            if (err) reject(err)
            else resolve()
        })
    })
}