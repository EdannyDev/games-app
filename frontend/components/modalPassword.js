import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.8); /* Fondo oscuro con transparencia */
  backdrop-filter: blur(10px); /* Efecto blur */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 300px; /* Ancho del modal */
  max-width: 90%; /* Ancho máximo para adaptarse a pantallas pequeñas */
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro semi-transparente */
  z-index: 1000;
`;

const Title = styled.h2`
  color: white; /* Color del texto */
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.2); /* Fondo del input semi-transparente */
  border: none;
  border-radius: 8px;
  color: white; /* Color del texto */
  font-size: 16px;
  outline: none;
  transition: background-color 0.3s ease-in-out;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5); /* Color del placeholder */
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.3); /* Fondo del input cuando está enfocado */
  }
`;

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: #ccc;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  right: 13px;
  top: 50%; /* Centramos verticalmente */
  transform: translateY(-70%);
`;

const ConfirmButton = styled.button`
  margin-top: 15px;
  margin-right: 10px; /* Espacio entre los botones */
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

const CancelButton = styled.button`
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(255, 0, 0, 0.8); /* Rojo */
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: rgba(187, 0, 0, 0.8); /* Rojo más oscuro al hacer hover */
  }
`;

const Modal = ({
  handleCloseModal,
  handleResetPassword,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
    handleResetPassword();
  };

  return (
    <>
      <ModalBackdrop onClick={handleCloseModal} />
      <ModalContainer>
        <Title>Restablecer Contraseña</Title>
        <form onSubmit={handleSubmit}>
          <InputContainer>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nueva Contraseña"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <ToggleButton type="button" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </ToggleButton>
          </InputContainer>
          <br />
          <InputContainer>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
            <ToggleButton type="button" onClick={toggleConfirmPasswordVisibility}>
              <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
            </ToggleButton>
          </InputContainer>
          <br />
          <ConfirmButton type="submit" style={{ marginRight: "46.5px" }}>
            <FontAwesomeIcon icon={faCheck} /> Confirmar</ConfirmButton>
          <CancelButton onClick={handleCloseModal}> 
            <FontAwesomeIcon icon={faTimes} /> Cancelar</CancelButton>
        </form>
      </ModalContainer>
    </>
  );
};

export default Modal;