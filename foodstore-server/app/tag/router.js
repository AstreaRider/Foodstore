const router = require('express').Router()
const tagController = require('./controller')
const multer = require('multer')

router.post('/tags', multer().none(), tagController.store)
router.put('/tags/:id', multer().none(), tagController.update)
router.delete('/tags/:id', multer().none(), tagController.destroy)
module.exports = router