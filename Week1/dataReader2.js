
const MongoClient = require("mongodb").MongoClient;
const fs = require('fs').promises;

const dbName = "wineTaste";
const collectionName = "tastes";
const url = "mongodb://localhost:27017";
const fileName = "wines.json";
const client = new MongoClient(url, { useNewUrlParser: true });

async function main(){
    try{
        const start = Date.now();
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const wineTastingData = await fs.readFile(fileName, "utf-8");
        //console.log(wineTastingData);
        await collection.insertMany(JSON.parse(wineTastingData));
        const count = await collection.find().count();
        console.log(`${count} records were added in ${(Date.now() - start) /1000 } seconds`);

        process.exit();
    } catch(error){
        console.log(error);
        

    }
}

main();