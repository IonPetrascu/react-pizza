import './scss/app.scss';
import NotFound from './pages/NotFound';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import React from 'react';
import FullPizza from './pages/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="pizza/:id" element={<FullPizza />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
