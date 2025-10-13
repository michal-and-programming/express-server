const express = require('express');
const uuid = require('uuid');

const app = express();
app.use(express.json());

const testimonialsRouter = require('./routes/testimonials.routes');
app.use('/api', testimonialsRouter);

const concertsRouter = require('./routes/concerts.routes');
app.use('/api', concertsRouter);

const seatsRouter = require('./routes/seats.routes');
app.use('/api', seatsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});