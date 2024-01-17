import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function FullPizza() {
  const { id } = useParams();
  const [item, setItem] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        await axios
          .get(`https://659d3c46633f9aee7908fa23.mockapi.io/items/${id}`)
          .then((res) => setItem(res.data));
      } catch (error) {
        alert('Ошибка при получении пиццы');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  console.log(item);

  if (!item) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="container">
      <img width={400} height={400} src={item.imageUrl} alt="" />
      <h2>{item.title}</h2>
      <p>{item.price} руб.</p>
    </div>
  );
}

export default FullPizza;
