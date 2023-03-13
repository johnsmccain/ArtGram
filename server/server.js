import express from "express";
// import appRouter from "./routes/index";

const port = process.env.PORT || 5000
const app = express();

app.use(express.json());
// app.use("/", appRouter);

app.listen(port, ()=> console.log(`Server is running on port ${port}!`));