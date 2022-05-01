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

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000;

var db = "mongodb://localhost:27017/crispy";

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
mongoose.connection.on('connected', () =>{
  console.log("Mongoose is connected with mongoDB")
})

app.use(express.static(path.join(__dirname, "../Badbank/build")));



app.use('/', routes)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
