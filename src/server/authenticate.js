import md5 from "md5";
import { v4 as uuidv4 } from "uuid";
import { connectDB } from "./connect-db";

const authenticationsTokens = [];

async function assembleUserState(user) {
  let db = await connectDB();

  let tasks = await db.collection("tasks").find({ owner: user.id }).toArray();
  let groups = await db.collection("groups").find({ owner: user.id }).toArray();

  return {
    tasks,
    groups,
    session: { authenticated: "AUTHENTICATED", id: user.id },
  };
}

export const authenticationRoute = (app) => {
  app.post("/authenticate", async (req, res) => {
    let { username, password } = req.body;
    let db = await connectDB();
    let collection = await db.collection("users");

    let user = await collection.findOne({ name: username });

    if (!user) {
      res.status(500).send("User not found");
    }

    let hash = md5(password);
    let passwordCorrect = hash === user.password;

    if (!passwordCorrect) {
      res.status(500).send({ "Password incorrect": password });
    }

    let token = uuidv4();

    authenticationsTokens.push({
      token,
      iserID: user.id,
    });

    let state = await assembleUserState(user);

    res.send({ token, state });
  });
};
