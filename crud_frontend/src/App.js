import './App.css';
import Header from "./components/Header";
import React from "react";
import Home from "./components/pages/Home";
import {Route, Routes} from "react-router-dom";
import ItemDetail from "./components/pages/ItemDetail";
import CreateItem from "./components/pages/CreateItem";
import UpdateItem from "./components/pages/UpdateItem";
import DeleteItem from "./components/pages/DeleteItem";

function App() {
  return (
    <>
    <Header />

    <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/items/:id"  element={<ItemDetail/>} />
        <Route path="/items/create" element={<CreateItem/>} />
        <Route path="/items/:id/update" element={<UpdateItem/>} />
        <Route path="/items/:id/delete" element={<DeleteItem/>} />
    </Routes>
    </>
  );
}

export default App;