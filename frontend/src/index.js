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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store.js";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ShippingScreen from "./screens/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import PaymentScreen from "./screens/PaymentScreen.jsx";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.jsx";
import OrderScreen from "./screens/OrderScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import OrderListScreen from "./screens/admin/OrderListScreen.jsx";
import ProductListScreen from "./screens/admin/ProductListScreen.jsx";
import UserListScreen from "./screens/admin/UserListScreen.jsx";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store.js'; // Assuming you configured redux-persist



// using proxy in package.json so that we don't need to always type the backend url for it

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* if index is not true, mulitple screens will be show at once*/}
      <Route index={true} path="/" element={<HomeScreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>
        <Route path="/profile" element={<ProfileScreen />}></Route>
      </Route>

      <Route path="" element={<AdminRoute/>}>
        <Route path="/admin/orderlist" element={<OrderListScreen/>}></Route>
        <Route path="/admin/productlist" element={<ProductListScreen/>}></Route>
        <Route path="/admin/userlist" element={<UserListScreen/>}></Route>
      </Route>
    </Route>
)
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  
);

reportWebVitals();
