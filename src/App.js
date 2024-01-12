import './scss/app.scss';
import Header from './Components/Header';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart'
import { useState } from 'react';
import React from 'react';

export const SearchContext = React.createContext('')
function App() {
  const [searchValue,setSearchValue] = useState('')

  return (
    <div className="wrapper">
   <SearchContext.Provider value={{searchValue,setSearchValue}}>
       <Header />
       <div className="content">
           <Routes>
             <Route path="/" element={<Home />}></Route>
             <Route path="/cart" element={<Cart />}></Route>
             <Route path="*" element={<NotFound />}></Route>
           </Routes>
       </div>
   </SearchContext.Provider>
    </div>
  );
}

export default App;
