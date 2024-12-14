import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #0d253f;
`;

export const TableContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 80px;
  padding: 20px;
  background-color: #1a2a46;
  color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  color: #ffffff;
  font-size: 2.5em;
  letter-spacing: 1.5px;
  text-transform: none;
  margin: 10px 0 30px;
  text-align: center;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 20px;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #152238;
  padding: 8px 12px;
  border-radius: 5px;
  border: 1px solid #1f4068; /* Ajustamos el color del borde */
  width: 250px;
`;

export const SearchIcon = styled(FontAwesomeIcon)`
  color: #ffffff;
  margin-right: 8px;
`;

export const SearchInput = styled.input`
  background: transparent;
  border: none;
  color: #ffffff;
  outline: none;
  &::placeholder {
    color: #b3b3b3;
  }
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  &:hover {
    background-color: #218838;
  }
  svg {
    margin-right: 8px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  border-spacing: 0;
  border-collapse: separate;
  border: 1px solid #1f4068; /* Reducimos el grosor del borde */
`;

export const TableHeader = styled.th`
  background-color: #1f4068;
  color: #ffffff;
  font-weight: normal;
  padding: 12px;
  text-align: center;
  border: none;
  &:first-of-type {
    border-top-left-radius: 10px;
  }
  &:last-of-type {
    border-top-right-radius: 10px;
  }
`;

export const TableRow = styled.tr`
  &:nth-of-type(even) {
    background-color: #152238;
  }
`;

export const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border: none;
  border-top: 1px solid #1f4068;
  border-bottom: 1px solid #1f4068;
  &:first-of-type {
    border-left: 1px solid #1f4068;
  }
  &:last-of-type {
    border-right: 1px solid #1f4068;
  }
`;

export const ActionButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${props => (props.edit ? '#ffd700' : '#e43f5a')};
  font-size: 1.2em;
  margin: 0 5px;
  transition: color 0.3s;
  &:hover {
    color: ${props => (props.edit ? '#e6c200' : '#c42f3f')};
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageNumber = styled.div`
  text-decoration: none;
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#1f4068' : '#152238')};
  border: 1px solid #1f4068;
  margin: 0 5px;
  cursor: pointer;
  &:hover {
    background-color: #1f4068;
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: #001f3f;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: center; /* Centra todo el contenido dentro del modal */
`;

export const ModalHeader = styled.h2`
  color: #ffffff;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const WarningIcon = styled.div`
  color: #ffc107; /* Color de advertencia */
  margin: 20px 0; /* Espaciado alrededor del ícono */
  font-size: 1em;
`;

export const ModalBody = styled.p`
  color: #ffffff;
  font-size: 1.1em;
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center; /* Centra los botones */
`;

export const ModalButton = styled.button`
  background-color: ${({ confirm }) => (confirm ? '#dc3545' : '#6c757d')}; /* Rojo para confirmar, gris para cancelar */
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  &:hover {
    background-color: ${({ confirm }) => (confirm ? '#c82333' : '#5a6268')}; /* Rojo más oscuro para el hover en confirmar, gris más oscuro para cancelar */
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  label {
    color: #ffffff;
    margin-right: 10px;
  }
  select {
    background-color: #1a2a46;
    color: #ffffff;
    border: 1px solid #1f4068;
    padding: 5px;
    border-radius: 5px;
  }
`;

export const Notification = styled.div`
  position: fixed;
  top: 20px; /* Ajusta esto según el espacio que quieras desde el borde superior */
  left: 40%;
  transform: translateX(-50%);
  background-color: ${({ type }) => (type === 'error' ? '#dc3545' : '#4caf50')};
  color: white;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.5s ease;
  width: 317px; /* Establece un ancho fijo para que ambas notificaciones tengan el mismo tamaño */
  text-align: left; /* Centra el texto en la notificación */
  &.animate__animated {
    animation-duration: 0.5s;
  }
  &.animate__fadeInDown {
    animation-name: fadeInDown;
  }
  &.animate__fadeOutUp {
    animation-name: fadeOutUp;
  }
`;

export const NotificationIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  font-size: 20px;
`;