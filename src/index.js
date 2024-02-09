const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const todoRouter = require("./routers/todo");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/todos", todoRouter);

app.listen(PORT, () => {
    console.log("server is running on port " + PORT);
});
