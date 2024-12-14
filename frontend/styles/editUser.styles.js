import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px); /* Comienza desde una posición más alta, pero centrada */
  }
  100% {
    opacity: 1;
    transform: translateY(50); /* Termina en su posición original */
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 150px auto; /* Ajustar el margen para centrar el formulario verticalmente */
  padding: 20px;
  background: #081726; /* Azul marino oscuro para el fondo del formulario */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  margin-bottom: 20px; /* Espacio entre el encabezado y el formulario */
  padding: 10px;
  color: white;
  border-radius: 8px 8px 0 0; /* Bordes redondeados solo en la parte superior */
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  box-shadow: none;
`;

export const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #444; 
  border-radius: 4px;
  background: #0d253f;
  color: #fff;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #005bb5; /* Azul marino medio para el fondo del botón */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #003d79; /* Azul marino más oscuro para el fondo al pasar el ratón */
  }
`;

export const BackButton = styled(Button)`
  background-color: #6c757d; /* Gris para el botón de regresar */
  &:hover {
    background-color: #5a6268; /* Gris oscuro para el fondo al pasar el ratón */
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px; /* Añadir un margen superior para separar los botones del formulario */
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%); /* Centrado horizontal */
  background-color: #28a745; /* Verde para el fondo de la notificación */
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${slideDown} 0.5s ease-out;
  display: flex;
  align-items: center;
  z-index: 1000; /* Asegúrate de que esté sobre otros elementos */
  font-size: 16px;

  /* Color del icono */
  svg {
    color: white;
    font-size: 20px;
    margin-right: 10px; /* Espacio entre el texto y el icono */
  }
`;