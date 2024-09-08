// import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./slices/apiSlice.js";
// import cartSliceReducer from "./slices/cartSlice.js";
// import authSliceReducer from "./slices/authSlice.js";

// const store = configureStore({
//   reducer: {
//     [apiSlice.reducerPath]: apiSlice.reducer,
//     cart: cartSliceReducer,
//     auth: authSliceReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(apiSlice.middleware),
//   devTools: true,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice.js";
import cartSliceReducer from "./slices/cartSlice.js";
import authSliceReducer from "./slices/authSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { combineReducers } from "redux";

// Step 3: Create the persist configuration
const persistConfig = {
  key: 'root', // Key for localStorage
  storage,
  whitelist: ['auth','cart'], // Persist only the 'auth' slice
};

// Combine reducers
const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
});

// Step 4: Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 5: Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Required to ignore non-serializable values from redux-persist
    }).concat(apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;

