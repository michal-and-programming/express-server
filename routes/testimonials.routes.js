const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const db = require('../db');

router.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

router.get('/testimonials/:id', (req, res) => {
  const reqId = req.params.id;
  const id = db.testimonials.find(e => e.id == reqId);
  res.json(id);
});

router.get('/testimonials/random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * db.testimonials.length);
  const drawResult = db.testimonials[randomNumber];
  res.json(drawResult);
});

router.post('/testimonials', (req, res) => {
  const { author, text } = req.body;
  const id = uuid();
  const newTestimonialsData = {
    id: id,
    author: author,
    text: text
  };
  db.testimonials.push(newTestimonialsData);
  res.json({message: 'OK'});
});

router.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const reqID = req.params.id;
  const matchIndex = db.testimonials.findIndex(e => e.id == reqID);
  db.testimonials[matchIndex].author = author;
  db.testimonials[matchIndex].text = text;
  res.json({message: 'OK'});
});

router.delete('/testimonials/:id', (req, res) => {
  const reqId = req.params.id;
  const matchIndex = db.testimonials.findIndex(e => e.id == reqId);
  db.testimonials.splice(matchIndex, 1);
  res.json({message: 'OK'});
});

module.exports = router;