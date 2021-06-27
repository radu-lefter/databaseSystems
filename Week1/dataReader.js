const http = require("http");
const fs = require('fs');
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "wineTasting";
const client = new MongoClient(url, { useNewUrlParser: true });

server.on("request", async (req, res) => {
  const { url, headers } = req;

try {
  
  const wines = JSON.parse(fs.readFileSync('wines.json', 'utf-8'));

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("tastes");
  await collection.insertMany(wines);
  res.end("request ended");
} catch (e) {
  console.log(e);
  res.end("could not update");
}

});

server.listen(8080);
