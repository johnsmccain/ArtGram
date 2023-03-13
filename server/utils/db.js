// import { m } from "mongodb"

import mongoose from "mongoose";

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_HOST || 27017;
const DATABASE = process.env.DB_HOST || 'gallery';

const url = `mongodb://${HOST}:${PORT}/${DATABASE}`;



const dbClient = ()=> mongoose.connect(url).then(()=>{
            console.log(`${DATABASE} is connected to MongoDB successful`);})
module.exports = dbClient