import './scss/app.scss';
import Header from './Components/Header';
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import PizzaBlock from './Components/PizzaBlock';

import axios from 'axios';
import React, { useEffect } from 'react';

function App() {
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    axios.get('https://659d3c46633f9aee7908fa23.mockapi.io/items')
      .then((res) => setItems(res.data));
  }, []);

  
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
