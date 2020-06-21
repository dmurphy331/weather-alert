const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

//STATIC FOLDER
app.use(express.static(path.join(__dirname, "../client/build")));

// Body Parser Middleware
app.use(bodyParser.json());

// Deal with CORS
app.use(cors());

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "weatheralert";

// Create a new MongoClient
const client = new MongoClient(url);

var db;

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});

// Start Express listening
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Test to make sure the API can talk to React
app.get("/", (req, res) => {
  return res.json({
    status: res.statusCode,
    data: {
      message: "API Active",
    },
  });
});

// Test to make sure the API can talk to React
app.get("/cities", (req, res) => {
  db.collection("cities")
    .find({})
    .toArray((err, results) => {
      return res.json({
        status: res.statusCode,
        data: {
          cities: results,
        },
      });
    });
});
