import React from 'react';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import { SearchContext } from '../App';

function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const {searchValue} = React.useContext(SearchContext)

  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [categoryId, setCategoryId] = React.useState(0);
  const orders = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue.toLowerCase()}` : '';
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://659d3c46633f9aee7908fa23.mockapi.io/items?page=${page}&limit=4${
          categoryId > 0 ? `&category=${categoryId}` : ''
        }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${orders}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => error);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue,page]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  /*  const pizzas = items.filter((obj)=>{
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true
    }
    return false
  })
  .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />); */

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort value={sortType} onClickType={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={number => setPage(number)}/>
    </div>
  );
}

export default Home;
