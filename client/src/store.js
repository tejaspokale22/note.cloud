import { configureStore, combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./Slices/noteSlice";
import uiReducer from "./Slices/uiSlice";
import authReducer from "./Slices/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Combine all your reducers
const rootReducer = combineReducers({
  note: noteReducer,
  ui: uiReducer,
  auth: authReducer,
});

// Persist config to define what part of the state you want to persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Persist only the auth reducer
};

// Create a persisted reducer using persistReducer and the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Create the persistor
export const persistor = persistStore(store);
