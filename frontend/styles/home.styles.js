import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

export const Header = styled.header`
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  border-bottom: 1px solid #888;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 5px;
`;

export const TitleGames = styled.h2`
  font-size: 2rem;
  margin-bottom: 50px;
  margin-top: -50px;
`;

export const Description = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
  line-height: 1.5;
`;

export const FeaturedProductsSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 300px;
  margin: auto;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 170px;
`;

export const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin: 10px;
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #888;
  margin: 0 10px 10px;
`;