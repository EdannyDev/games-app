import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #001f3f; /* Azul marino gamer */
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  color: #fff;
  text-align: center;
  position: relative;
`;

const ModalHeader = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const ModalBody = styled.div`
  margin: 20px 0;
`;

const ModalFooter = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  background: ${props => (props.primary ? '#dc3545' : '#6c757d')};
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    opacity: 0.9;
  }
`;

const WarningIcon = styled(FontAwesomeIcon)`
  color: #ffc107; /* Amarillo representativo */
  font-size: 3rem; /* Tamaño del ícono más grande */
  animation: shake 0.5s infinite;

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(0); }
    75% { transform: translateX(5px); }
    100% { transform: translateX(0); }
  }
`;

const ModalConfirmation = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>Confirmación de Eliminación</ModalHeader>
        <ModalBody>
          <p style={{ marginBottom: "15px" }}>¿Estás seguro de que deseas eliminar esta reseña?</p>
          <WarningIcon icon={faExclamationTriangle} />
        </ModalBody>
        <ModalFooter>
          <Button primary onClick={onConfirm} style={{ marginRight: "5px" }}>
            <FontAwesomeIcon icon={faTrash} /> Eliminar
          </Button>
          <Button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} /> Cancelar
          </Button>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ModalConfirmation;