import express from 'express';
import morgan from 'morgan';
import router from './routes/index';
import dbClient from './utils/db';

const port = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan('dev'));
app.use('/', router);

app.disable('x-powered-by');

app.listen(port, () => {
  dbClient();
  console.log(`Server is running on port ${port}!`);
});
