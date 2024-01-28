import { useReducer, useState } from "react";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import taskReducer from "../../reducers/taskReducer";
import initialTasks from "../../data/tasks";
import { TaskContext } from "../../contexts/TaskContext";
import { SearchContext } from "../../contexts/SearchContext";
import AddTaskModal from "./AddTaskModal";
import DeleteModal from "../DeleteModal";
import NoTasksFound from "./NoTasksFound";

export default function TaskBoard() {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [search, setSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState({
    title: "",
    isShow: false,
  });
  const [taskToDelete, setTaskToDelete] = useState(null);

  const isDeleteAll = Object.is(taskToDelete, null);

  const onAddClick = () => setShowAddModal(true);

  const onCloseClick = () => {
    setTaskToUpdate(null);
    setShowAddModal(false);
  };

  const handleUpdate = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleFav = (id) => {
    dispatch({
      type: "toggleFav",
      id,
    });
  };

  const handleDeleteAndDeleteAll = () => {
    dispatch({
      type: isDeleteAll ? "deleteAll" : "delete",
      id: isDeleteAll ? null : taskToDelete,
    });
    setShowDeleteModal({ title: "", isShow: false });
    setTaskToDelete(null);
  };

  const handleDeleteModalShow = (title, id) => {
    setShowDeleteModal({ title, isShow: true });
    id && setTaskToDelete(id);
  };

  const handleDeleteModalClose = () => {
    setShowDeleteModal({ title: "", isShow: false });
    setTaskToDelete(null);
  };

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {showAddModal && (
        <AddTaskModal onCloseClick={onCloseClick} taskToUpdate={taskToUpdate} />
      )}
      {showDeleteModal.isShow && (
        <DeleteModal
          title={showDeleteModal.title}
          handleDeleteAndDeleteAll={handleDeleteAndDeleteAll}
          handleDeleteModalClose={handleDeleteModalClose}
        />
      )}
      <section className="mb-20 w-full flex justify-center" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <SearchContext.Provider value={{ search, setSearch }}>
              <TaskActions
                onAddClick={onAddClick}
                handleDeleteModalShow={handleDeleteModalShow}
              />
              {tasks.length > 0 ? (
                <TaskList
                  onUpdate={handleUpdate}
                  onFav={handleFav}
                  handleDeleteModalShow={handleDeleteModalShow}
                />
              ) : (
                <NoTasksFound />
              )}
            </SearchContext.Provider>
          </div>
        </div>
      </section>
    </TaskContext.Provider>
  );
}
