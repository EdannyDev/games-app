import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSearch, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import ConfirmationModal from '../frontend/components/modalDelete';
import { 
  Card, 
  TableWrapper, 
  Table, 
  Thead, 
  Th, 
  Td, 
  Tr, 
  EditButton, 
  DeleteButton, 
  Title, 
  SearchWrapper, 
  SearchInputWrapper, 
  SearchInput, 
  SearchIcon, 
  PaginationSelect, 
  PaginationWrapper, 
  PaginationButton, 
  SelectLabel, 
  SelectContainer, 
  Notification, 
  NotificationWrapper,
  NotificationIcon
} from '../frontend/styles/users.styles';
import Layout from '@/frontend/components/layout';
import Footer from '@/frontend/components/footer';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const router = useRouter();

  useEffect(() => {
    axios.get('http://localhost:5000/api/users', { headers: getAuthHeaders() })
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    setFilteredUsers(users.filter(user => 
      user.name.toLowerCase().includes(lowercasedFilter) ||
      user.email.toLowerCase().includes(lowercasedFilter) ||
      user.role.toLowerCase().includes(lowercasedFilter)
    ));
    setCurrentPage(1);
  }, [searchTerm, users]);

  useEffect(() => {
    // Bloquear el scroll cuando el modal está abierto
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Limpia el efecto cuando el componente se desmonta o el estado cambia
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${selectedUser._id}`, { headers: getAuthHeaders() });

      setUsers(users.filter(user => user._id !== selectedUser._id));
      setFilteredUsers(filteredUsers.filter(user => user._id !== selectedUser._id));
      setShowModal(false);
      setNotification({ message: 'Usuario eliminado con éxito!', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
      const token = localStorage.getItem('token');

      if (token) {
        const response = await axios.post('/api/decode-token', { token }, { headers: getAuthHeaders() });
        const decodedToken = response.data.decoded;

        if (decodedToken.id === selectedUser._id) {  
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setNotification({ message: 'Error al eliminar el usuario.', type: 'error' });
      setTimeout(() => setNotification({ message: '', type: '' }), 3000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  };

  return (
    <Layout>
      <Card>
        <Title>Usuarios Registrados</Title>
        <SearchWrapper>
          <SearchInputWrapper>
            <SearchIcon>
              <FontAwesomeIcon icon={faSearch} />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
            />
          </SearchInputWrapper>
          <SelectContainer>
            <SelectLabel>Mostrar por página:</SelectLabel>
            <PaginationSelect 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </PaginationSelect>
          </SelectContainer>
        </SearchWrapper>
        <TableWrapper>
          <Table>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Rol</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <tbody>
              {paginatedUsers.map(user => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    <Link href={`/editUser/${user._id}`}>
                      <EditButton>
                        <FontAwesomeIcon icon={faEdit} />
                      </EditButton>
                    </Link>
                    <DeleteButton onClick={() => handleDelete(user)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </DeleteButton>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
        <PaginationWrapper>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationButton 
              key={i + 1} 
              onClick={() => handlePageChange(i + 1)} 
              active={currentPage === i + 1}
            >
              {i + 1}
            </PaginationButton>
          ))}
        </PaginationWrapper>
        {showModal && <ConfirmationModal onConfirm={confirmDelete} onCancel={() => setShowModal(false)} />}
        {notification.message && (
          <NotificationWrapper>
            <Notification type={notification.type}>
              <NotificationIcon>
                <FontAwesomeIcon 
                  icon={notification.type === 'success' ? faCheckCircle : faExclamationCircle} 
                />
              </NotificationIcon>
              {notification.message}
            </Notification>
          </NotificationWrapper>
        )}
      </Card>
      <Footer />
    </Layout>
  );
};

export default UserTable;