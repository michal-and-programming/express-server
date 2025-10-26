const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeat = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'not found' });
    res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.newSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const isTaken = await Seat.findOne({ day, seat });
    if (isTaken) res.status(409).json({ message: 'The slot is already taken...' });

    const newSeat = new Seat({ day, seat, client, email });
    await newSeat.save();

    if (req.io) req.io.emit('seatsUpdated', await Seat.find());

    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;

    const updatedSeat = await Seat.findByIdAndUpdate(
      req.params.id,
      { day, seat, client, email }
    );

    if (!updatedSeat) res.status(404).json({ message: 'OK' });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const deletedSeat = await Seat.findByIdAndDelete(req.params.id);
    if (!deletedSeat) res.status(404).json({ message: 'not found' });
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};