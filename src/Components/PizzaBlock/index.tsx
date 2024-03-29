import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cart/slice';
import { selectCartItemById } from '../../redux/slices/cart/selectors';

import { Link } from 'react-router-dom';
import { CartItem } from '../../redux/slices/cart/types';

const typeNames = ['тонкое', 'традиционное'];
type PizzaBlockProps = {
  id: string;
  imageUrl: string;
  price: number;
  sizes: number[];
  title: string;
  types: number[];
};

const PizzaBlock: React.FC<PizzaBlockProps> = ({ id, imageUrl, price, sizes, title, types }) => {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const obj = useSelector(selectCartItemById(id));
  let addedCount;
  if (obj?.count) {
    addedCount = obj.count;
    
  } else {
    addedCount = 0;
  }

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <Link to={`pizza/${id}`}>
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? 'active' : ''}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((sizeId, i) => (
            <li
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? 'active' : ''}
              key={i}
            >
              {sizeId} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount ? <i>{addedCount}</i> : <i>0</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
