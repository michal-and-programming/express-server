const express = require('express');
const uuid = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonialsRouter = require('./routes/testimonials.routes');
app.use('/api', testimonialsRouter);

const concertsRouter = require('./routes/concerts.routes');
app.use('/api', concertsRouter);

const seatsRouter = require('./routes/seats.routes');
app.use('/api', seatsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});
