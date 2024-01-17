import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Skeleton from '../Components/PizzaBlock/Skeleton';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaBlock from '../Components/PizzaBlock';
import Pagination from '../Components/Pagination';
import { sortList } from '../Components/Sort';

import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

function Home() {
  const navigate = useNavigate();
  const { sort, categoryId, pageCount ,searchValue} = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizzas);

  const isSearch = React.useRef(false);

  const isMounted = React.useRef(false);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  

  const onClickCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  const orders = sortType.includes('-') ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue.toLowerCase()}` : '';

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        orders,
        search,
        categoryId,
        pageCount,
        sortType,
      }),
    );
    window.scrollTo(0, 0);
  };

  //Daca sau schimbat patametrele si a fost primul render
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        pageCount,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, pageCount]);

  //Daca a fost primul render,atunci controlam Url-parametre si salvam in redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //Daca a fost primul render atunci creme pizzele
  React.useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, pageCount]);

  /*  const pizzas = items.filter((obj)=>{
    if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true
    }
    return false
  })
  .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />); */

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Что-то пошло не так... </h2>
          <p>Не удалось получить данные.Попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination value={pageCount} onChangePage={(number) => onChangePage(number)} />
    </div>
  );
}

export default Home;
