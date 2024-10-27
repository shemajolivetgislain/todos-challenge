import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import todosSlice from "../features/todoSlice";
import todosActionsSlice from "../features/actionSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import translationSlice from "../features/translationSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  todosActions: todosActionsSlice,
  translation: translationSlice,
  todos: todosSlice,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todosActions", "translation", "todos"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

export default store;
