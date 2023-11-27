import express from 'express';
import bodyParser from 'body-parser';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import projectRouter from './routes/projectRouter.js';
import sampleRouter from './routes/sampleRouter.js';
import analysisRouter from './routes/analysisRouter.js';
import mapRouter from './routes/mapRouter.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
const dir_path = '../dummy-data';

app.use(cors());
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

// Serve static files (images and CSV) from the 'dummy-data' directory
app.use('/data', express.static(join(dirname(fileURLToPath(import.meta.url)), dir_path)));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
