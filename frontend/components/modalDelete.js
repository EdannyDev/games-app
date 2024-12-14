import { ModalOverlay, ModalContent, Title, WarningIcon, Message, ConfirmButton, CancelButton } from '../styles/modalDelete.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTimes, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <Title>
          Confirmar Eliminación
        </Title>
        <WarningIcon>
          <FontAwesomeIcon icon={faUserTimes} />
        </WarningIcon>
        <Message>¿Estás seguro de que deseas eliminar este usuario?</Message>
        <div>
          <ConfirmButton onClick={onConfirm}>
            <FontAwesomeIcon icon={faCheck} /> Sí
          </ConfirmButton>
          <CancelButton onClick={onCancel}>
            <FontAwesomeIcon icon={faTimes} /> No
          </CancelButton>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ConfirmationModal;