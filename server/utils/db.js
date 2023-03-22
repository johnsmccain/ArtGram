import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const DATABASE = process.env.DB_HOST || 'gallery';
const MONGODB_URL = process.env.MONGODB_URL;

const url = MONGODB_URL || `mongodb://localhost:27017/gallery`;

const dbClient = () =>
  mongoose.connect(url).then(() => {
    console.log(`${DATABASE} is connected to MongoDB successful`);
  });
module.exports = dbClient;
