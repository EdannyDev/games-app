import styled from '@emotion/styled';

export const CanceledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8d7da;
  text-align: center;
  color: #721c24;
`;

export const CanceledTitle = styled.h1`
  font-size: 2.5rem;
  margin-top: 20px;
  color: #e53e3e;
`;

export const CanceledMessage = styled.p`
  font-size: 1.25rem;
  margin-top: 15px;
  color: #721c24;
`;

export const BackHomeButton = styled.a`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #c53030;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #9b2c2c;
  }
`;