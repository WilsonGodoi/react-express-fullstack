import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { defaultState } from "../../server/defaultState";
import * as mutations from "./mutations";
import * as sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(session = defaultState.session) {
      return session;
    },
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: "New Task",
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map((task) =>
            task.id === action.taskID
              ? { ...task, isComplete: action.isComplete }
              : task
          );
        case mutations.SET_TASK_NAME:
          return tasks.map((task) =>
            task.id === action.taskID ? { ...task, name: action.name } : task
          );
        case mutations.SET_TASK_GROUP:
          return tasks.map((task) =>
            task.id === action.taskID
              ? { ...task, group: action.groupID }
              : task
          );
      }
      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
