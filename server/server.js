import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import morgan from 'morgan';
import router from './routes/index';
import dbClient from './utils/db';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;
const app = express();

// Set up cors to allow requests from client
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));

app.use('/', router);

app.disable('x-powered-by');

app.listen(port, () => {
  dbClient();
  console.log(`Server is running on port ${port}!`);
});
