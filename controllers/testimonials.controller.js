const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    if (testimonials.length === 0) res.status(404).json({ message: 'not found' });
    const randomIndex = Math.floor(Math.random() * testimonials.length);
    res.json(testimonials[randomIndex]);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.newTestimonial = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Testimonial({ author, text });
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const { author, text } = req.body;

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { author, text }
    );

    if (!updatedTestimonial) res.status(404).json({ message: 'OK' });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const deletedTestimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deletedTestimonial) res.status(404).json({ message: 'not found' });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
