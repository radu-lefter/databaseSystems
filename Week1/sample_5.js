const http = require("http");
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "student";
const client = new MongoClient(url, { useNewUrlParser: true });

server.on("request", (req, res) => {
  const { url, headers } = req;

async function run() {
try {
  const students = [
    {
      name: { first: "joe", last: "appleton" },
      dob: new Date("August 12, 1982"),
    },
    {
      name: { first: "bill", last: "smith" },
      dob: new Date("August 12, 1982"),
    },
  ];
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("students");
  const result = await collection.insertMany(students);
  
  res.end(JSON.stringify(result));

} catch (e) {
  console.log(e);
  res.end("could not update");
}
}
run().catch(console.dir);
});

server.listen(8080);
