const http = require("http");
const fs = require('fs');
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "wineTasting";
const client = new MongoClient(url, { useNewUrlParser: true });

const wines = JSON.parse(fs.readFileSync('wines.json', 'utf-8'));

client.connect();

server.on("request",  (req, res) => {
  const { url, headers } = req;

try {
  //const start = Date.now();
  
  const db = client.db(dbName);
  const collection = db.collection("tastes");
  collection.insertMany(wines);
  const count = collection.find().count();
  //console.log(`${count} records were added in ${(Date.now - start) /1000 } seconds`)

  console.log("number of records inserted: "+ count);

  res.end("request ended");
} catch (e) {
  console.log(e);
  res.end("could not update");
}

});

server.listen(8080);
