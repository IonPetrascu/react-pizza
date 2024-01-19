import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
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



  if (!item) {
    return <>Loading...</>
  }
  return (
    <div className="container">
      <img width={400} height={400} src={item.imageUrl} alt="" />
      <h2>{item.title}</h2>
      <p>{item.price} руб.</p>
    </div>
  );
};

export default FullPizza;
