import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import axios from 'axios';
import Pagination from '../Components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId,setPageCount } from '../redux/slices/filterSlice';

function Home() {
  const { sort, categoryId,pageCount } = useSelector((state) => state.filter);

  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { searchValue } = React.useContext(SearchContext);

  const onClickCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number)=>{
    dispatch(setPageCount(number))
  }
  //const [categoryId, setCategoryId] = React.useState(0);
  const orders = sortType.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue.toLowerCase()}` : '';
  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `https://659d3c46633f9aee7908fa23.mockapi.io/items?page=${pageCount}&limit=4${
          categoryId > 0 ? `&category=${categoryId}` : ''
        }&sortBy=${sortType.replace('-', '')}&order=${orders}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      })
      .catch((error) => error);
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, pageCount]);


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
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination value={pageCount} onChangePage={(number)=>onChangePage(number)} />
    </div>
  );
}

export default Home;
