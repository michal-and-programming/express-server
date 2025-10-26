const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try { 
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getConcert = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'not found' });
    res.json(concert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.newConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer, genre, price, day, image });
    await newConcert.save();
    res.json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err});
  }
};

exports.updateConcert = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;

    const updatedConcert = await Concert.findByIdAndUpdate(
      req.params.id,
      { performer, genre, price, day, image },
    );

    if (!updatedConcert) res.status(404).json({ message: 'not found' });
    res.json({ message: 'ok', updatedConcert });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteConcert = async (req, res) => {
  try {
    const deletedConcert = await Concert.findByIdAndDelete(req.params.id);
    if (!deletedConcert) res.status(404).json({ message: 'not found' });
    res.json({ message: 'ok' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};