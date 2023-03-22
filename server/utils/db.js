import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const HOST = process.env.MONGODB_HOST;
const PORT = process.env.MONGODB_PORT;
const DATABASE = process.env.MONGODB_DATABASE;
const URL = process.env.MONGODB_URL;

const url = `mongodb+srv://${HOST}:${PORT}/${DATABASE}`;

const dbClient = () =>
  mongoose.connect(URL).then(() => {
    console.log(`Gallery is connected to MongoDB successful`);
  });
module.exports = dbClient;
