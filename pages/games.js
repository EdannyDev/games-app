import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faGamepad, faSearch, faExclamationTriangle, faCheckCircle, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import 'animate.css';
import {
  PageContainer,
  TableContainer,
  HeaderContainer,
  Title,
  FilterContainer,
  SearchContainer,
  SearchIcon,
  SearchInput,
  AddButton,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  ActionButton,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  PaginationContainer,
  PageNumber,
  SelectContainer,
  Notification,
  NotificationIcon,
  WarningIcon
} from '../frontend/styles/games.styles';
import Layout from '../frontend/components/layout';
import Footer from '@/frontend/components/footer';

const GamesTable = () => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage, setGamesPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [gameToDelete, setGameToDelete] = useState(null);
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    const filteredGames = games.filter((game) =>
      Object.values(game).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredGames(filteredGames);
    setCurrentPage(1);
  }, [searchTerm, games]);

  useEffect(() => {
    // Bloquea el scroll cuando el modal está abierto
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

  const fetchGames = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/games');
      setGames(response.data);
      setFilteredGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token');
        setNotification({ type: 'error', message: 'No se encontró el token.' });
        return;
      }

      await axios.delete(`http://localhost:5000/api/games/${gameToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchGames();
      closeModal();
      setNotification({ type: 'success', message: 'Juego eliminado exitosamente.' });
    } catch (error) {
      console.error('Error deleting game:', error);
      setNotification({ type: 'error', message: 'Error al eliminar el juego. Intenta nuevamente.' });
    }
  };

  const openModal = (id) => {
    setGameToDelete(id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setGameToDelete(null);
  };

  const handleAddGame = () => {
    router.push('/addGames');
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const handleGamesPerPageChange = (event) => {
    setGamesPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = filteredGames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000); // La notificación se ocultará después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Layout>
      <PageContainer>
        {notification && (
          <Notification
            className="animate__animated animate__fadeInDown"
            type={notification.type}
            visible={!!notification}
          >
            <NotificationIcon icon={notification.type === 'error' ? faExclamationTriangle : faCheckCircle} />
            {notification.message}
          </Notification>
        )}
        <TableContainer>
          <HeaderContainer>
            <Title>Registro de Videojuegos</Title>
            <FilterContainer>
              <SearchContainer>
                <SearchIcon icon={faSearch} />
                <SearchInput
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </SearchContainer>
              <AddButton onClick={handleAddGame}>
                <FontAwesomeIcon icon={faGamepad} />
                Agregar Videojuego
              </AddButton>
            </FilterContainer>
          </HeaderContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Título</TableHeader>
                <TableHeader>Género</TableHeader>
                <TableHeader>Plataforma</TableHeader>
                <TableHeader>Precio</TableHeader>
                <TableHeader>Año de Lanzamiento</TableHeader>
                <TableHeader>Desarrollador</TableHeader>
                <TableHeader>Acciones</TableHeader>
              </tr>
            </thead>
            <tbody>
              {currentGames.map((game) => (
                <TableRow key={game._id}>
                  <TableCell>{game.title}</TableCell>
                  <TableCell>{game.genre}</TableCell>
                  <TableCell>{game.platform}</TableCell>
                  <TableCell>${game.price}</TableCell>
                  <TableCell>{game.releaseYear}</TableCell>
                  <TableCell>{game.developer}</TableCell>
                  <TableCell>
                    <ActionButton edit onClick={() => handleEdit(game._id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </ActionButton>
                    <ActionButton onClick={() => openModal(game._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <SelectContainer>
            <label htmlFor="gamesPerPage">Mostrar por página: </label>
            <select id="gamesPerPage" value={gamesPerPage} onChange={handleGamesPerPageChange}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </SelectContainer>
          <Pagination
            gamesPerPage={gamesPerPage}
            totalGames={filteredGames.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </TableContainer>
        {showModal && (
          <ModalContainer>
            <ModalContent>
              <ModalHeader>Confirmar Eliminación</ModalHeader>
              <WarningIcon className="animate__animated animate__heartBeat animate__infinite">
                <FontAwesomeIcon icon={faExclamationTriangle} size="3x" />
              </WarningIcon>
              <ModalBody>¿Estás seguro de que deseas eliminar este videojuego?</ModalBody>
              <ModalFooter>
                <ModalButton confirm onClick={handleDelete}>
                  <FontAwesomeIcon icon={faCheck} />
                  Confirmar
                </ModalButton>
                <ModalButton onClick={closeModal}>
                  <FontAwesomeIcon icon={faTimes} />
                  Cancelar
                </ModalButton>
              </ModalFooter>
            </ModalContent>
          </ModalContainer>
        )}
      </PageContainer>
      <Footer></Footer>
    </Layout>
  );
};

const Pagination = ({ gamesPerPage, totalGames, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((number) => (
        <PageNumber
          key={number}
          onClick={() => paginate(number)}
          active={currentPage === number}
        >
          {number}
        </PageNumber>
      ))}
    </PaginationContainer>
  );
};

export default GamesTable;