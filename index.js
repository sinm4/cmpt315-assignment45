import bodyParser from "body-parser";
import express from "express";
import { connectDB } from "./database/database.js";
import monsters from "./routes/monsters.route.js";

// TODO: Deploy node.js app to Render and mongodb to MongoDB Atlas

const app = express();
const port = 8000;

connectDB();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// routes
app.use("/monsters", monsters);

app.listen(port, function () {
  console.log(`🚀 Fire app listening on port ${port}!`);
});
