const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const io = socket(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? ''
      : 'http://localhost:3000'
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

io.on('connection', (socket) => {
  console.log('New socket!')
});

const testimonialsRouter = require('./routes/testimonials.routes');
app.use('/api', testimonialsRouter);

const concertsRouter = require('./routes/concerts.routes');
app.use('/api', concertsRouter);

const seatsRouter = require('./routes/seats.routes');
app.use('/api', seatsRouter);

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

server.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
