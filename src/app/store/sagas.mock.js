import { put, take } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";
import * as mutations from "./mutations";

export function* taskCreatingSaga() {
  while (true) {
    const { groupID } = yield take(mutations.REQUEST_TASK_CREATION);
    const ownerID = "U1";
    const taskID = uuidv4();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    console.log("Got group ID", groupID);
  }
}
