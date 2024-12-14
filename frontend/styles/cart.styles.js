import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

export const CartTable = styled.div`
  display: table;
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  color: #fff;
`;

export const CartRow = styled.div`
  display: table-row;
  border-bottom: 1px solid #2a3c5c;
  background-color: transparent;
`;

export const CartCell = styled.div`
  display: table-cell;
  padding: 10px;
  font-size: 18px;
`;

export const HeaderRow = styled(CartRow)`
  font-weight: bold;
  background-color: transparent;
`;

export const HeaderCell = styled(CartCell)`
  text-align: left;
  border-bottom: 2px solid #fff;
  background-color: transparent;
`;

export const ItemTitle = styled.span`
  font-size: 18px;
`;

export const ItemPrice = styled.span`
  font-size: 18px;
  color: #fff;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 16px;
  padding: 5px;
  transition: color 0.3s;

  &:hover {
    color: #c53030;
  }
`;

export const BackButton = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
  text-decoration: none;
  background-color: #a0aec0; // Gris claro
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #718096; // Gris oscuro
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;  // Alinear a la izquierda
  gap: 10px;
  margin-top: 30px;
`;

export const CheckoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #48bb78;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #38a169;
  }
`;

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 18px;
  color: #fff;
`;

export const SummaryText = styled.p`
  margin: 0;
`;