import { MongoClient } from "mongodb";
const url =
  "mongodb+srv://wilson:<PASSWORD>@carsalesdb-aqmca.azure.mongodb.net/myorganizer?retryWrites=true&w=majority";
let db = null;

export async function connectDB() {
  if (db) return db;
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("Got DB", db);
  return db;
}

// connectDB();
