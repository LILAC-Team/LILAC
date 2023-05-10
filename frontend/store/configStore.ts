import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import user from "./modules/user/index";
import playList from "./modules/playList";
import playerController from "./modules/playerController";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
  playList,
  playerController,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: (state, action) => {
      switch (action.type) {
        case HYDRATE:
          // return action.payload;
          return { ...state, ...action.payload };
        default:
          return persistedReducer(state, action);
      }
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
  // debug: true,
});

export type RootState = ReturnType<typeof persistedReducer>;
export type AppDispatch = any;
export default wrapper;
