const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const routes = require("./routes/api");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
// require('dotenv').config();
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
// const errorHandler = require('./middleware/errorHandler');
// const verifyJWT = require('./middleware/verifyJWT');
// const cookieParser = require('cookie-parser');
// const credentials = require('./middleware/credentials');
// const mongoose = require('mongoose');
//const connectDB = require('./config/dbConn');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// custom middleware logger
app.use(logger);

const port = process.env.PORT || 4000;

var db = "mongodb://localhost:27017/crispy";

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected with mongoDB");
});

app.use(express.static(path.join(__dirname, "../Badbank/build")));
app.use('/', express.static(path.join(__dirname, '/public')));
app.use("/", routes);

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepts("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepts("json")) {
//     res.json({ error: "404 Not Found" });
//   } else {
//     res.type("txt").send("404 Not Found");
//   }
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
