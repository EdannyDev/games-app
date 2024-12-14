import styled from '@emotion/styled';

export const FormContainer = styled.div`
  background-color: #081726; /* Fondo azul marino gamer más oscuro */
  color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px; /* Ajustado para manejar contenido horizontal */
  margin: 0 auto;
  margin-top: 20px;
  display: flex; /* Mostrar el formulario como flexbox */
`;

export const FormLeft = styled.div`
  flex: 1; /* Ocupar todo el espacio disponible */
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const FormRight = styled.div`
  flex: 1; /* Ocupar todo el espacio disponible */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem; /* Tamaño de fuente más grande */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1; /* Ocupar todo el espacio disponible */
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #444; /* Borde más oscuro */
  border-radius: 4px;
  background-color: #0d253f; /* Fondo azul marino oscuro */
  color: #fff;
  font-size: 0.9rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #444; /* Borde más oscuro */
  border-radius: 4px;
  background-color: #0d253f; /* Fondo azul marino oscuro */
  color: #fff;
  font-size: 0.9rem;
  resize: vertical;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar contenido horizontalmente */
  margin-top: 20px; /* Espacio adicional */
`;

export const UploadLabel = styled.label`
  background-color: #3f51b5; /* Azul */
  color: #fff; /* Texto blanco */
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #303f9f; /* Azul más oscuro al hacer hover */
  }

  & > input[type='file'] {
    display: none;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  height: auto; /* Ajustar altura automáticamente */
  margin-top: 20px; /* Espacio adicional */
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* Alinear botones a la izquierda */
  margin-top: auto; /* Mover hacia abajo */
  width: 100%; /* Asegurar que los botones ocupen todo el ancho */
  margin-bottom: 20px; /* Espacio entre imagen y botones */
`;

export const SubmitButton = styled.button`
  background-color: #4caf50; /* Verde */
  color: #fff; /* Texto blanco */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c; /* Verde más oscuro al hacer hover */
  }
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: #fff; /* Texto blanco */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-left: 10px; /* Espacio entre botones */

  &:hover {
    background-color: #5a6268;
  }
`;

export const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.5s forwards, fadeOut 0.5s 3s forwards;

  ${({ type }) =>
    type === 'success'
      ? `
        background-color: #4caf50; /* Verde */
        color: #fff;
      `
      : type === 'error'
      ? `
        background-color: #dc3545; /* Rojo */
        color: #fff;
      `
      : `
        background-color: #ffc107; /* Amarillo */
        color: #000;
      `}

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(20px);
    }
  }
`;