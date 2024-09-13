import React from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Comments from "./Components/Comments/Comments";
import Offs from "./Components/Offs/Offs";
import Products from "./Components/Products/Products";
import Users from "./Components/Users/Users";
import Orders from "./Components/Orders/Orders";
import "./App.css";
import routes from "./routes";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <Sidebar />

      <div className="main">
        <Header />
        {router}
        {/* <Routes>
          <Route path="/product" element={<Products />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/offs" element={<Offs />} />
        </Routes> */}
      </div>
    </>
  );
}

export default App;
