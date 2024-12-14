import styled from '@emotion/styled';

export const ForgotPasswordForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/img/fondo2.jpg') no-repeat center center/cover;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid transparent;
  border-radius: 8px;
  color: black;
  font-size: 16px;
  line-height: 1.5;
  transition: border-color 0.3s ease-in-out;

  &::placeholder {
    color: #333;
  }

  &:focus {
    outline: none;
    border-color: rgba(38, 213, 72, 0.8);
  }
`;

export const Button = styled.button`
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(38, 213, 72, 0.8);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(26, 187, 63, 0.8);
  }
`;

export const Link = styled.a`
  color: rgba(0, 0, 0);
  text-decoration: none;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  display: block;
  margin-top: 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #555;
  }
`;

export const LinkText = styled.span`
  font-weight: 500;
`;

export const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  padding: 15px;
  background-color: ${props => props.type === 'success' ? '#28a745' : '#dc3545'};
  color: #ffffff;
  border: 1px solid ${props => props.type === 'success' ? '#28a745' : '#dc3545'};
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

export const NotificationHeader = styled.h4`
  margin: 0 0 5px;
  font-size: 18px;
  color: #ffffff;
`;

export const NotificationMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: #ffffff;
`;

export const TokenDisplay = styled.div`
  margin-top: 20px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  color: #000;
`;