import styled from '@emotion/styled';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f4f8;
  text-align: center;
  color: #2d3748;
`;

export const SuccessTitle = styled.h1`
  font-size: 2.5rem;
  margin-top: 20px;
  color: #38a169;
`;

export const SuccessMessage = styled.p`
  font-size: 1.25rem;
  margin-top: 15px;
  color: #4a5568;
`;

export const BackHomeButton = styled.a`
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #3182ce;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2b6cb0;
  }
`;