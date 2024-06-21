import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import "bootstrap/dist/css/bootstrap.min.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

// using proxy in package.json so that we don't need to always type the url for it

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* if index is not true, mulitple screens will be show at once*/}
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
