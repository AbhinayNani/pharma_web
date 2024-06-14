const express = require("express");
const path = require("path");
const serv = express();
const { connectToDb, getDb } = require("./db");
const { log } = require("console");

serv.use(express.static(path.join(__dirname, "public")));
serv.use(express.json());
serv.use("/scripts", express.static(path.join(__dirname, "scripts")));

serv.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
//connection to db
let db;
connectToDb((err) => {
  if (!err) {
    serv.listen(9000, () => {
      console.log("Server is running on port 9000");
    });
    db = getDb();
    //update insert and do operations
  }
});
// Serve static files from the 'public' directory

// Serve scripts from the 'scripts' directory globally

//cursor to documents in foreach loop iin smaller batches
serv.get("/", (req, res) => {
  let books = [];

  db.collection("patient")
    .find()
    .sort()
    .forEach((book) => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});

serv.post("/", (req, res) => {
  const patient = req.body;
  console.log("HTTP Request to post data");
  console.log(req.body);
  db.collection("patient")
    .insertOne(patient)
    .then((re) => {
      res.status(201).json(re);
    })
    .catch((err) => {
      res.status(501).json({ error: "couldn't not create a new document" });
    });
});
