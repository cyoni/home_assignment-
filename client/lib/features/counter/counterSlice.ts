import { createAppSlice } from "@/lib/createAppSlice";
const initialState = {
  isTaskModalOpen: false,
  taskOnEdit: null,
  tasksState: "LOADING",
  formSubmitState: "READY",
  tasks: [],
};

export const counterSlice = createAppSlice({
  name: "userTasks",
  initialState,

  reducers: (create) => ({
    setTasksState: create.reducer((state, action) => {
      state.tasksState = action.payload;
    }),
    addTask: create.reducer((state, action) => {
      state.tasks.push(action.payload);
    }),
    updateTask: create.reducer((state, action) => {
      const { id } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? action.payload.task : task
      );
    }),
    deleteTask: create.reducer((state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    }),
    setTasks: create.reducer((state, action) => {
      state.tasks = action.payload;
    }),
    triggerTaskModal: create.reducer((state, action) => {
      state.isTaskModalOpen = action.payload.isOpen;
      state.taskOnEdit = action.payload.task;
    }),
    setSubmitState: create.reducer((state, action) => {
      state.formSubmitState = action.payload;
    }),
  }),

  selectors: {
    selectTasks: (state) => state.tasks,
    selectIsTaskModalOpen: (state) => state.isTaskModalOpen,
    selectTaskOnEdit: (state) => state.taskOnEdit,
    selectFormSubmitState: (state) => state.formSubmitState,
    selectTasksState: (state) => state.tasksState,
  },
});

export const {
  setTasks,
  triggerTaskModal,
  deleteTask,
  updateTask,
  addTask,
  setSubmitState,
  setTasksState,
} = counterSlice.actions;
export const {
  selectTasks,
  selectIsTaskModalOpen,
  selectTaskOnEdit,
  selectFormSubmitState,
  selectTasksState,
} = counterSlice.selectors;
