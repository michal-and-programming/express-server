const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonials.controller');

router.get('/testimonials', testimonialsController.getAll);
router.get('/testimonials/:id', testimonialsController.getTestimonial);
router.get('/testimonials/random', testimonialsController.getRandom);
router.post('/testimonials', testimonialsController.newTestimonial);
router.put('/testimonials/:id', testimonialsController.updateTestimonial);
router.delete('/testimonials/:id', testimonialsController.deleteTestimonial);

module.exports = router;