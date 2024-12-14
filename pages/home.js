import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Importar Link para redireccionamiento
import Layout from '@/frontend/components/layout';
import Footer from '@/frontend/components/footer';
import { 
  Container, 
  Header, 
  Title, 
  TitleGames,
  Description,   
  FeaturedProductsSection, 
  ProductGrid, 
  ProductCard, 
  ProductImage, 
  ProductTitle, 
  ProductPrice, 
} from '../frontend/styles/home.styles';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/games');
        const allProducts = response.data;

        const getRandomProducts = (products, count) => {
          const shuffled = products.sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
        };

        setProducts(allProducts);
        setFeaturedProducts(getRandomProducts(allProducts, 3));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <Container>
        <Header>
          <Title>SmarTech</Title>
          <Description>En SmarTech nos dedicamos a ofrecer los mejores videojuegos y tecnología de vanguardia para todos los entusiastas del gaming. ¡Explora nuestros productos y únete a la comunidad SmarTech!</Description>
        </Header>

        <FeaturedProductsSection>
          <TitleGames>Videojuegos Populares</TitleGames>
          <ProductGrid>
            {featuredProducts.map(product => (
              <Link key={product._id} href={`/gameDetails/${product._id}`} passHref>
                <ProductCard>
                  <ProductImage src={product.image} alt={product.title} />
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductPrice>${product.price}</ProductPrice>
                </ProductCard>
              </Link>
            ))}
          </ProductGrid>
        </FeaturedProductsSection>

        <Footer />
      </Container>
    </Layout>
  );
};

export default HomePage;