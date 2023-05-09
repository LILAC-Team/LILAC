import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";

// import { applyMiddleware, createStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";
// import persistStore from "redux-persist/es/persistStore";

import user from "./modules/user/index";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user,
});

const reducers = persistReducer(persistConfig, rootReducer);

// const makeConfiguredStore = (reducer) =>
//   createStore(reducer, undefined, applyMiddleware(thunk));

// const makeStore = () => {
//   const isServer = typeof window === "undefined";

//   if (isServer) {
//     return makeConfiguredStore(rootReducer);
//   } else {
//     const store = makeConfiguredStore(reducers);
//     const persistor = persistStore(store);
//     return { persistor, ...store };
//   }
// };

export const makeStore = () => {
  const store = configureStore({
    reducer: (state, action) => {
      switch (action.type) {
        case HYDRATE:
          return action.payload;
        default:
          return reducers(state, action);
      }
    },
  });
  return store;
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof reducers>;
// export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = any;
export default wrapper;
