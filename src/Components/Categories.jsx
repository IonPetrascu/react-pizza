import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const category = [' Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const clickCategory = (number) => {
    setActiveCategory(number);
  };

  return (
    <div className="categories">
      <ul>
        <li onClick={() => clickCategory(0)} className={activeCategory === 0 ? 'active' : ''}>
          Все
        </li>
        <li onClick={() => clickCategory(1)} className={activeCategory === 1 ? 'active' : ''}>
          Мясные
        </li>
        <li onClick={() => clickCategory(2)} className={activeCategory === 2 ? 'active' : ''}>
          Вегетарианская
        </li>
        <li onClick={() => clickCategory(3)} className={activeCategory === 3 ? 'active' : ''}>
          Гриль
        </li>
        <li onClick={() => clickCategory(4)} className={activeCategory === 4 ? 'active' : ''}>
          Острые
        </li>
        <li onClick={() => clickCategory(5)} className={activeCategory === 5 ? 'active' : ''}>
          Закрытые
        </li>
      </ul>
    </div>
  );
}

export default Categories;
