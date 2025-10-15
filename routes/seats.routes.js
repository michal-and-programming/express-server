const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const db = require('../db');

router.get('/seats', (req, res) => {
  res.json(db.seats);
});

router.get('/seats/:id', (req, res) => {
  const reqId = req.params.id;
  const id = db.seats.find(e => e.id == reqId);
  res.json(id);
});

router.post('/seats', (req, res) => {
  const {day, seat, client, email} = req.body;
  const isTaken = db.seats.some(item => item.day === day && item.seat === seat);

  if (isTaken) {
    return res.status(409).json({ message: 'The slot is already taken...' });
  }
  const id = uuid();
  const newSeatsData ={
    id, day, seat, client, email
  };
  db.seats.push(newSeatsData);
  res.json({message: 'OK'});
});

router.delete('/seats/:id', (req, res) => {
  const reqId = req.params.id;
  const matchIndex = db.seats.findIndex(e => e.id == reqId);
  db.seats.splice(matchIndex, 1);
  res.json({message: 'OK'});
});

router.put('/seats/id', (req, res) => {
  const {day, seat, client, email} = req.body;
  const reqID = req.params.id;
  const matchIndex = db.seats.findIndex(e => e.id == reqID);
  db.seats[matchIndex].day = day;
  db.seats[matchIndex].seat = seat;
  db.seats[matchIndex].client = client;
  db.seats[matchIndex].email = email;
  res.json({message: 'OK'});
});

module.exports = router;