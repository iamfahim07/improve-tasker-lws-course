export default function taskReducer(tasks, action) {
  switch (action.type) {
    case "add": {
      return [...tasks, action.newTask];
    }

    case "update": {
      return tasks.map((task) => {
        if (task.id === action.updatedTask.id) {
          return action.updatedTask;
        }
        return task;
      });
    }

    case "toggleFav": {
      return tasks.map((task) => {
        if (task.id === action.id) {
          return { ...task, isFavorite: !task.isFavorite };
        }
        return task;
      });
    }

    case "delete": {
      return tasks.filter((task) => task.id !== action.id);
    }

    case "deleteAll": {
      return [];
    }

    default: {
      throw Error(`No action matched with ${action.type}`);
    }
  }
}
