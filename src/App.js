import './scss/app.scss';
import Header from './Components/Header';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart'

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
       
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        
      </div>
    </div>
  );
}

export default App;
