import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Asegura que el modal esté encima de todos los elementos */
`;

export const ModalContent = styled.div`
  background: #001f3f;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 100%;
  max-width: 500px;
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 10px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-3px); }
  50% { transform: translateX(3px); }
  75% { transform: translateX(-3px); }
  100% { transform: translateX(0); }
`;

export const WarningIcon = styled.div`
  animation: ${shake} 1s ease-in-out infinite; /* Sacudida constante */
  color: #dc3545; /* Rojo */
  margin: 20px 0;
  font-size: 2em;
`;

export const Message = styled.p`
  font-size: 18px;
  margin: 20px 0;
`;

export const ConfirmButton = styled.button`
  background-color: #dc3545; /* Rojo para confirmar */
  color: white;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled.button`
  background-color: #6c757d; /* Gris para cancelar */
  color: white;
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  &:hover {
    opacity: 0.9;
  }
`;