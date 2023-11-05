const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const projectRouter = require('./routes/projectRouter');
const sampleRouter = require('./routes/sampleRouter');
const analysisRouter = require('./routes/analysisRouter');
const mapRouter = require('./routes/mapRouter');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});
app.use('/api/projects', projectRouter);
app.use('/api/samples', sampleRouter);
app.use('/api/analyses', analysisRouter);
app.use('/api/maps', mapRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
