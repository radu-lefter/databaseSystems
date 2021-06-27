const http = require("http");
const server = http.createServer();
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
//const dbName = "student";
const client = new MongoClient(url, { useNewUrlParser: true });

server.on("request", async (req, res) => {
  const { url, headers } = req;


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
  await client.connect(function(err, db) {
    if (err) throw err;
    var dbo = db.db("student");
    
    dbo.collection("students").insertMany(students, function(err, result) {
      if (err) throw err;
      console.log("Number of documents inserted: " + result.insertedCount);
      res.end(JSON.stringify(result));
      //db.close();
    });
    
  });


  

} catch (e) {
  console.log(e);
  res.end("could not update");
}

});

server.listen(8080);
