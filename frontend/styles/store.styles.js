import styled from '@emotion/styled';

export const Container = styled.div`
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  position: relative;
  overflow: hidden;
  background-image: url('img/fondo3.jpg');
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }

  * {
    position: relative;
    z-index: 1;
  }
`;

export const Title = styled.h1`
  margin-top: 50px;
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`;

export const ProductCard = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  padding: 20px;
  margin: 20px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
`;

export const ProductTitle = styled.h3`
  margin: 10px 0;
  font-size: 1.5rem;
  color: #333;
`;

export const ProductPrice = styled.p`
  font-size: 1.2rem;
  color: #0070f3;
  margin: 10px 0;
`;

export const ProductRating = styled.div`
  font-size: 1.1rem;
  color: #f39c12;
  margin: 10px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
  width: 100%;
`;

export const Button = styled.button`
  background-color: ${(props) => (props.primary ? '#0070f3' : '#555')};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;

  &:hover {
    background-color: ${(props) => (props.primary ? '#005bb5' : '#333')};
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${props => props.type === 'success' ? '#28a745' : '#dc3545'};
  color: white;
  padding: 10px 35px;  // Reducido el padding para hacerla más delgada
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  font-size: 1.2rem;  // Tamaño de fuente más pequeño

  & > svg {
    font-size: 1.3rem;  // Icono un poco más pequeño
  }
`;