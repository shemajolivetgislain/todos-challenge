import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a Todo item
interface Todo {
  id: number;
  todo: string;
  completed: boolean;
}

// Define the type for the initial state
interface TodosState {
  todos: Todo[];
  singleTodo: Todo | null;
  allTodosSize: number;
  incompleteTodosSize: number;
  completeTodosSize: number;
}

const initialState: TodosState = {
  todos: [],
  singleTodo: null,
  allTodosSize: 0,
  incompleteTodosSize: 0,
  completeTodosSize: 0,
};
const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
      state.allTodosSize += 1;
      if (action.payload.completed) {
        state.completeTodosSize += 1;
      } else {
        state.incompleteTodosSize += 1;
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(
        (todo) => todo.id === action.payload.id
      );
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setSingleTodo: (state, action: PayloadAction<Todo>) => {
      state.singleTodo = action.payload;
    },
    setAllTodos: (state, action: PayloadAction<number>) => {
      state.allTodosSize = action.payload;
    },
    setImcompleteTodos: (state, action: PayloadAction<number>) => {
      state.incompleteTodosSize = action.payload;
    },
    setCompleteTodos: (state, action: PayloadAction<number>) => {
      state.completeTodosSize = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  updateTodo,
  setSingleTodo,
  deleteTodo,
  setAllTodos,
  setCompleteTodos,
  setImcompleteTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
