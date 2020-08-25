import { connectDB } from "./connect-db";
import { defaultState } from "./defaultState";

async function initializeDB() {
  let db = await connectDB();
  for (let collectionName in defaultState) {
    let collection = db.collection(collectionName);
    await collection.insertMany(defaultState[collectionName]);
  }
}

initializeDB();
