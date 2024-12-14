import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar, faInfoCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Container, Title, ProductCard, ProductImage, ProductTitle, ProductPrice, ProductRating, Button, ButtonGroup, Notification } from '../frontend/styles/store.styles';
import Layout from '@/frontend/components/layout';
import { useCart } from '@/context/cartContext'; // Asegúrate de importar el hook

const Store = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null);
  const router = useRouter();
  const { addToCart } = useCart(); // Usa el hook del contexto

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (id) => {
    router.push(`/gameDetails/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification({
      type: 'success',
      message: 'Videojuego añadido al carrito',
      icon: <FontAwesomeIcon icon={faCheckCircle} />
    });
    setTimeout(() => setNotification(null), 3000); // Eliminar la notificación después de 3 segundos
  };

  return (
    <Layout>
      <Container>
        <Title>Bienvenidos a SmarTech</Title>
        {notification && (
          <Notification type={notification.type}>
            {notification.icon}
            {notification.message}
          </Notification>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductTitle>{product.title}</ProductTitle>
              <ProductPrice>${product.price}</ProductPrice>
              <ProductRating>
                <FontAwesomeIcon icon={faStar} /> {product.averageRating ? product.averageRating.toFixed(1) : 'N/A'}
              </ProductRating>
              <ButtonGroup>
                <Button primary onClick={() => handleAddToCart(product)}>
                  <FontAwesomeIcon icon={faCartPlus} /> Añadir al carrito
                </Button>
                <Button onClick={() => handleViewDetails(product._id)}>
                  <FontAwesomeIcon icon={faInfoCircle} /> Ver Detalles
                </Button>
              </ButtonGroup>
            </ProductCard>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Store;