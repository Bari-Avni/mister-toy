const logger = require('../../services/logger.service')
// const express = require('express')
const toyService = require('./toy.service')


// const router = express.Router()

// Toy API

// Get List Of Toys
async function getToys(req, res) {
    // console.log('req.query', req.query);
    // const filterBy = {
    //     txt: req.query.txt || '',
    //     pageIdx: +req.query.pageIdx || 0
    // }
    console.log('gettoys');
    try {
        const filterBy = req.query;
        const toys = await toyService.query(filterBy)
        res.send(toys)
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
    // toyService.query(filterBy)
    // .then(toys => {
    //     res.json(toys)
    // })
}


// Get a single toy by id
async function getToy(req, res) {
    try {
        console.log('req.params', req.params);
        const toyId = req.params.toyId;
        const toy = await toyService.getById(toyId)
        res.send(toy)
    } catch (err) {
        logger.error('Cannot get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
    // const toyId = req.params.toyId
    // toyService.getById(toyId)
    //     .then(toy => {
    //         res.json(toy)
    //     })
}

// Add Toy
async function addToy(req, res) {
    // const { name, price, type, inStock } = req.body
    // const toy = { name, price, type, inStock }
    // toyService.save(toy)
    //     .then((savedToy) => {
    //         console.log('Added Toy:', savedToy);
    //         res.json(savedToy)
    //     })
    try {
        var toy = req.body
        toy = await toyService.add(toy)
        res.send(toy)
    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
    // try {
    //     const { name, price, type, inStock } = req.body
    //     const toy = { name, price, type, inStock }
    //     toy = await toyService.save(toy)
    //     res.send(toy)
    // } catch (err) {
    //     logger.error('Failed to add toy', err)
    //     res.status(500).send({ err: 'Failed to add toy' })
    // }
}

// Update a Toy
async function updateToy(req, res) {
    // const { name, price, type, inStock, _id, createdAt } = req.body
    // const toy = { _id, name, price, type, inStock, createdAt }
    // toyService.save(toy)
    //     .then((savedToy) => {
    //         console.log('Updated Toy:', savedToy);
    //         res.json(savedToy)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         return res.status(401).send('access denied')
    //     })

    try {
        const toy = req.body
        // const toyId = req.params.toyId;
        // const toy = await toyService.getById(toyId)
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }

    // try {
    //     const { name, price, type, inStock, _id, createdAt } = req.body
    //     const toy = { _id, name, price, type, inStock, createdAt }
    //     toy = await toyService.save(toy)
    //     res.send(toy)
    // } catch (err) {
    //     logger.error('Failed to update toy', err)
    //     res.status(500).send({ err: 'Failed to update toy' })
    // }
}

// remove toy by id
async function deleteToy(req, res) {
    // console.log('Server Side Session: ', req.session);
    // const toyId = req.params.toyId
    // toyService.remove(toyId)
    //     .then(() => {
    //         res.json('Deleted...')
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         return res.status(401).send('access denied')
    //     })

    try {
        const toyId = req.params.toyId
        await toyService.remove(toyId)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}

module.exports = {
    // router,
    getToys,
    getToy,
    addToy,
    updateToy,
    deleteToy
}