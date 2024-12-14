import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Card = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 120px auto;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: #1a2a46;
`;

export const Title = styled.h2`
  text-align: center;
  color: #ffffff;
  margin-bottom: 20px;
  font-size: 2.5em;
`;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

export const SearchInput = styled.input`
  width: 53%;
  padding: 8px 8px 8px 32px;
  font-size: 16px;
  border: 1px solid #1f4068;
  border-radius: 4px;
  outline: none;
  background: #152238;
  color: #ffffff;
  box-sizing: border-box;
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ffffff;
`;

export const SelectLabel = styled.span`
  margin-right: 10px;
  color: #ffffff;
  font-size: 16px;
  white-space: nowrap;
`;

export const PaginationSelect = styled.select`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #1f4068;
  border-radius: 4px;
  outline: none;
  background:  #1a2a46;
  color: #ffffff;
  cursor: pointer;
`;

export const TableWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  border-top: 2px solid #1f4068;
  border-left: 2px solid #1f4068;
  border-right: 2px solid #1f4068;
  border-bottom: 2px solid #1a2a46;
  border-radius: 13px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 0;
  font-size: 18px;
  text-align: left;
  border-radius: 12px;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background-color: #1f4068;
  color: #ffffff;
`;

export const Th = styled.th`
  padding: 12px 15px;
  border-right: none;
  text-align: center;
`;

export const Td = styled.td`
  padding: 12px 15px;
  border-right: none;
  text-align: center;
`;

export const Tr = styled.tr`
  border-bottom: 2px solid #1f4068;
  &:nth-of-type(even) {
    background-color: #152238;
  }
`;

export const EditButton = styled.button`
  margin-right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  color: #ffd700;
  font-size: 1.2em;
  &:hover {
    color: #e6c200;
  }
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  color: #c42f3f;
  font-size: 1.2em;
  &:hover {
    color: #c42f3f;
  }
`;

export const PaginationWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #1f4068;
  border-radius: 5px;
  background-color: ${props => (props.active ? '#1f4068' : '#152238')};
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #1f4068;
  }
`;

export const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
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
  background-color: #1a2a46;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: center;
`;

export const ModalHeader = styled.h2`
  color: #ffffff;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

export const WarningIcon = styled.div`
  color: #ffc107;
  margin: 20px 0;
  font-size: 1em;
`;

export const ModalBody = styled.p`
  color: #ffffff;
  font-size: 1.1em;
  margin-bottom: 20px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
`;

export const ModalButton = styled.button`
  background-color: ${({ confirm }) => (confirm ? '#007bff' : '#6c757d')};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
  &:hover {
    background-color: ${({ confirm }) => (confirm ? '#0056b3' : '#5a6268')};
  }
`;

export const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 300px;
`;

export const Notification = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const NotificationIcon = styled.div`
  margin-right: 10px;
  font-size: 1.5em;
`;