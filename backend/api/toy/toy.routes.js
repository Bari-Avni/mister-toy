const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {getToys, getToy, addToy, updateToy, deleteToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:toyId', log, getToy)
router.post('/',   addToy)  // requireAuth,
router.put('/:toyId',   updateToy)  // requireAuth,
router.delete('/:toyId',   deleteToy)  // requireAuth,

module.exports = router