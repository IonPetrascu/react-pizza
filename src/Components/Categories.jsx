import React from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const categories = [' Все', ' Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const clickCategory = (number) => {
    setActiveCategory(number);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li key={index}
            onClick={() => clickCategory(index)}
            className={activeCategory === index ? 'active' : ''}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
