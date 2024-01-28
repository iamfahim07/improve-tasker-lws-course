const initialTasks = [
  {
    id: crypto.randomUUID(),
    title: "Integration API",
    description:
      "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
    tags: ["Python", "API", "Data", "Synchronization"],
    priority: "High",
    isFavorite: true,
  },
  {
    id: crypto.randomUUID(),
    title: "API Data Synchronization with Python",
    description:
      "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
    tags: ["Web", "Python", "API"],
    priority: "Medium",
    isFavorite: false,
  },
];

export default initialTasks;
