import { useState } from "react";
import useTaskContext from "../../contexts/TaskContext";
import Warning from "../Warning";

/* eslint-disable react/prop-types */
export default function AddTaskModal({ onCloseClick, taskToUpdate }) {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );
  const [isWarning, setIsWarning] = useState({ show: false, fieldName: "" });

  const isAdd = Object.is(taskToUpdate, null);

  const { dispatch } = useTaskContext();

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let i in task) {
      if (typeof task[i] === "string" && task[i].trim().length == 0) {
        return setIsWarning({ show: true, fieldName: i });
      } else if (task[i] instanceof Array) {
        const isFilled = task[i].some((t) => t.trim().length > 0);

        if (!isFilled) {
          return setIsWarning({ show: true, fieldName: i });
        }
      }
    }

    const trimmedTask = {
      ...task,
      title: task.title.trim(),
      description: task.description.trim(),
      tags: task.tags.map((t) => t.trim()),
    };

    if (isAdd) {
      dispatch({
        type: "add",
        newTask: trimmedTask,
      });
    } else {
      dispatch({
        type: "update",
        updatedTask: trimmedTask,
      });
    }

    onCloseClick();
    setIsWarning({ show: false, fieldName: "" });
  };

  const handleClose = (e) => {
    e.preventDefault();
    setTask({});
    setIsWarning({ show: false, fieldName: "" });
    onCloseClick();
    console.log("close");
  };
  return (
    <>
      <div className="bg-black bg-opacity-70 h-full w-full z-10 absolute top-0 left-0"></div>
      <form
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>

        {isWarning.show && <Warning fieldName={isWarning.fieldName} />}

        <div className="mt-16 flex justify-between lg:mt-20">
          <button
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {isAdd ? "Create new Task" : "Update Task"}
          </button>
        </div>
      </form>
    </>
  );
}
