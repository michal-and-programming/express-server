const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seats.controller');

router.get('/seats', seatsController.getAll);
router.get('/seats/:id', seatsController.getSeat);
router.post('/seats', seatsController.newSeat);
router.put('/seats/:id', seatsController.updateSeat);
router.delete('/seats/:id', seatsController.deleteSeat);

module.exports = router;