const express = require("express"); //importing express module
const app = express(); //creating express instance
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const auth = require("./Middleware/auth");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose"); //importing mongooose module
const port = process.env.PORT || 9000;

const server = "127.0.0.1:27017"; // REPLACE WITH YOUR DB SERVER
const database = "taxData";
const offDataURL = `mongodb://${server}/${database}`;

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }
}

module.exports = new Database();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.listen(port, () => {
  console.log(port);
});

app.get("/", function (req, res) {
  res.send("Welcome to Jackfruit Backend");
});

// var User=require('./Routes/User');
// app.use('/',User)
app.post("/signup", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  //console.log(req.body)
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      Basic: null,
      LTA: null,
      HRA: null,
      FA: null,
      INV: null,
      Rent: null,
      Med: null,
      cityType: null,
      AppHRA: null,
    });
    user
      .save()
      .then((doc) => {
        res.status(201).json({
          message: "User is added successfully!",
          doc,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
});
app.post("/login", function (req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "user is not found",
        });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: "Incorrect password!",
            });
          }
          const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
            expiresIn: "24h",
          });
          res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user._id,
            token: token,
            message: "User is logged successfull!",
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
});
app.put("/user/:id", auth, (req, res, next) => {
  const query = new User({
    _id: req.params.id,
    Basic: req.body.Basic,
    LTA: req.body.LTA,
    HRA: req.body.HRA,
    FA: req.body.FA,
    INV: req.body.INV,
    Rent: req.body.Rent,
    Med: req.body.Med,
    cityType: req.body.cityType,
    AppHRA: req.body.AppHRA,
    updatedAt: { type: Date, default: new Date() },
  });
  User.updateOne({ _id: req.params.id }, query)
    .then((data) => {
      res.status(201).json({
        message: "User is updated successfully!",
        data,
        updatedAt: { type: Date, default: new Date() },
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
