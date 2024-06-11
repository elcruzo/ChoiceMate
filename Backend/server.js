const express = require("express");
const cors = require("cors");
const middlewares = require("./middleware/index");
const Routes = require("./routes/index");
const { connectDB } = require("./config/dbconfig");
const { errorHandler } = middlewares.errorhandler;
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const port = process.env.PORT || 3000;

const server = express();


server.use(cors());
server.use(express.json());

server.use("/api", Routes.authRoutes);

server.use(errorHandler);

server.listen(port, () => {
  connectDB();
  console.log(`Server Listening on port ${port}`);
});
