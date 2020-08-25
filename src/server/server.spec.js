import { addNewTask, updateTask } from "./server";

(async function myFunc() {
  await addNewTask({
    name: "My Task",
    id: "123456",
  });
  await updateTask({
    name: "My Task updated",
    id: "123456",
  });
})();
