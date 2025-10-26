const express = require('express');
const router = express.Router();
const concertsController = require('../controllers/concerts.controller');

router.get('/concerts', concertsController.getAll);
router.get('/concerts/:id', concertsController.getConcert);
router.post('/concerts', concertsController.newConcert);
router.put('/concerts/:id', concertsController.updateConcert);
router.delete('/concerts/:id', concertsController.deleteConcert);

module.exports = router;
