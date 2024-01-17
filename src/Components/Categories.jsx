import React from 'react';

const categories = [' Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ value, onClickCategory }) {

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
