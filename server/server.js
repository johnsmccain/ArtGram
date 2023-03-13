import express from "express";
import morgan from "morgan";
import appRouter from "./Routes/index";
import dbClient from "./utils/db";
const port = process.env.PORT || 5000
const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use("/", appRouter);

app.listen(port, ()=> {
    dbClient();
    console.log(`Server is running on port ${port}!`)
});