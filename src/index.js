import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./features/store";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import CarDetailPage from "./components/CarDetailPage";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <div>
          <Navbar />
          <App />
        </div>
      }
    >
      <Route path="/" element={<HomePage />} />
      <Route path="detail/:id" element={<CarDetailPage />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
