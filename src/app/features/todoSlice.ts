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
      state.todos = [action.payload, ...state.todos];
      state.allTodosSize += 1;
      if (!action.payload.completed) {
        state.incompleteTodosSize += 1;
      } else {
        state.completeTodosSize += 1;
      }
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
  setSingleTodo,
  setAllTodos,
  setCompleteTodos,
  setImcompleteTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
