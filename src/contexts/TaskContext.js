import { createContext, useContext } from "react";

export const TaskContext = createContext(null);

export default function useTaskContext() {
  return useContext(TaskContext);
}
