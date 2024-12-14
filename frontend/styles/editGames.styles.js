import styled from '@emotion/styled';

export const FormContainer = styled.div`
  background-color: #081726; /* Fondo azul marino */
  color: #fff; /* Texto blanco */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
`;

export const FormLeft = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const FormRight = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #0d253f; /* Azul marino oscuro */
  color: #fff;
  font-size: 0.9rem;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #0d253f; /* Azul marino oscuro */
  color: #fff;
  font-size: 0.9rem;
  resize: vertical;
`;

export const ImageUploadContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const UploadLabel = styled.label`
  background-color: #3f51b5; /* Azul */
  color: #fff;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #303f9f; /* Azul más oscuro */
  }

  & > input[type='file'] {
    display: none;
  }
`;

export const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: auto;
  width: 100%;
  margin-bottom: 20px;
`;

export const SubmitButton = styled.button`
  background-color: #ffcc00; /* Amarillo estándar para el fondo */
  color: #000; /* Texto blanco para contraste */
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffb300; /* Amarillo más oscuro para el hover */
  }
`;

export const BackButton = styled.button`
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  margin-left: 10px;

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