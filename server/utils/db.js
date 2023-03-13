// import { m } from "mongodb"

import MongoClient from "mongodb/lib/mongo_client.js";
import mongoose from "mongoose";

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_HOST || 27017;
const DATABASE = process.env.DB_HOST || 'gallery';

const url = `mongodb://${HOST}:${PORT}/${DATABASE}`;

mongoose.connect(url, )
class DBClient{
    constructor(){
        this.client = MongoClient(url);
        this.client.connect().then(()=>{
            this.db = this.client.db(`${DATABASE}`);
        }).catch((err) => {
            console.log(err)
        })
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const users = this.db.collection("users");
        const usersNum = await users.countDocuments();
        return usersNum;
    }

    async nbFiles() {
        const files = this.db.collection("files");
        const filesNum = await files.countDocuments();
        return filesNum;
    }
}
const dbClient = new DBClient();
module.exports = dbClient