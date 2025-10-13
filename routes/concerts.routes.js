const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const db = require('../db');

router.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

router.get('/concerts/:id', (req, res) => {
  const reqId = req.params.id;
  const id = db.concerts.find(e => e.id == reqId);
  res.json(id);
});

router.post('/concerts', (req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const id = uuid();
  const newConcertsData ={
    id, performer, genre, price, day, image
  };
  db.concerts.push(newConcertsData);
  res.json({message: 'OK'});
});

router.delete('/concerts/:id', (req, res) => {
  const reqId = req.params.id;
  const matchIndex = db.concerts.findIndex(e => e.id == reqId);
  db.concerts.splice(matchIndex, 1);
  res.json({message: 'OK'});
});

router.put('/concerts/:id', (req, res) => {
  const {performer, genre, price, day, image} = req.body;
  const reqID = req.params.id;
  const matchIndex = db.concerts.findIndex(e => e.id == reqID);
  db.concerts[matchIndex].performer = performer;
  db.concerts[matchIndex].genre = genre;
  db.concerts[matchIndex].price = price;
  db.concerts[matchIndex].day = day;
  db.concerts[matchIndex].image = image;
  res.json({message: 'OK'});
});

module.exports = router;