import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import Modal from '../../frontend/components/modalReviews';
import ModalConfirmation from '../../frontend/components/modalConfirmation';
import {
  Container,
  DetailsWrapper,
  ImageWrapper,
  DetailsContent,
  GameTitle,
  GamePrice,
  GameDescription,
  GameInfo,
  ReviewsSection,
  RelatedGamesSection,
  RelatedGameCard,
  RelatedGameImage,
  RelatedGameTitle,
  ReviewForm,
  RatingInput,
  CommentTextarea,
  SubmitButton,
  BackButton,
  ButtonWrapper,
  ButtonIcon
} from '../../frontend/styles/details.styles';
import Layout from '@/frontend/components/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faComments, faStar, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Footer from '@/frontend/components/footer';

const GameDetails = () => {
  const [game, setGame] = useState(null);
  const [relatedGames, setRelatedGames] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: '1', comment: '' });
  const [editingReview, setEditingReview] = useState(null);
  const [visibleReviews, setVisibleReviews] = useState(2);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchGameDetails = async () => {
      if (id) {
        try {
          const response = await axios.get(`http://localhost:5000/api/games/${id}`);
          setGame(response.data);

          const relatedResponse = await axios.get(`http://localhost:5000/api/games?genre=${response.data.genre}`);
          setRelatedGames(relatedResponse.data.filter(g => g._id !== id));

          const reviewsResponse = await axios.get(`http://localhost:5000/api/games/${id}/reviews`);
          setReviews(reviewsResponse.data);
        } catch (error) {
          console.error('Error fetching game details:', error);
          setError('No se pudo cargar la información del juego.');
        }
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/games/${id}/review`, newReview, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGame(response.data);
      setReviews(response.data.reviews);
      setNewReview({ rating: '1', comment: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      setError('No se pudo enviar la reseña. Inténtalo de nuevo.');
    }
  };

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^[1-5]?$/.test(value)) {
      setNewReview({ ...newReview, rating: value });
    }
  };

  const handleEditReview = (reviewId) => {
    const reviewToEdit = reviews.find(r => r._id === reviewId);
    setEditingReview(reviewToEdit);
    setIsEditModalOpen(true);
  };

  const handleUpdateReview = async (updatedReview) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/games/${id}/review/${updatedReview._id}`, updatedReview, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGame(response.data);
      setReviews(response.data.reviews);
      setEditingReview(null);
      setNewReview({ rating: '1', comment: '' });
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating review:', error);
      setError('No se pudo actualizar la reseña. Inténtalo de nuevo.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${id}/review/${reviewId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGame(prevGame => ({
        ...prevGame,
        reviews: prevGame.reviews.filter(review => review._id !== reviewId)
      }));
      setReviews(prevReviews => prevReviews.filter(review => review._id !== reviewId));
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('No se pudo eliminar la reseña. Inténtalo de nuevo.');
    }
  };

  const handleConfirmDelete = (reviewId) => {
    setReviewToDelete(reviewId);
    setIsConfirmModalOpen(true);
  };

  if (error) return <p>{error}</p>;
  if (!game) return <p>Cargando...</p>;

  return (
    <Layout>
      <Container>
        <DetailsWrapper>
          <ImageWrapper>
            <img src={game.image} alt={game.title} />
          </ImageWrapper>
          <DetailsContent>
            <GameTitle><strong>{game.title}</strong></GameTitle>
            <GamePrice>${game.price}</GamePrice>
            <GameDescription><strong>Descripción:</strong> {game.description}</GameDescription>
            <GameInfo>
              <p><strong>Género:</strong> {game.genre}</p>
              <p><strong>Plataforma:</strong> {game.platform}</p>
              <p><strong>Año de lanzamiento:</strong> {game.releaseYear}</p>
              <p><strong>Desarrollador:</strong> {game.developer}</p>
              <p><strong>Promedio de calificaciones:</strong> {game.averageRating ? game.averageRating.toFixed(1) : 'N/A'}</p>
            </GameInfo>
          </DetailsContent>
        </DetailsWrapper>

        <br />

        <ReviewsSection>
          <h2 style={{ fontSize: "20px" }}><strong>Reseñas de Usuarios</strong></h2>
          <div>
            {reviews.slice(0, visibleReviews).map(review => (
              <div key={review._id}>
                <p>
                  <strong>{review.user?.name || 'Desconocido'}</strong> - {review.rating} 
                  &nbsp;<FontAwesomeIcon icon={faStar} style={{ color: "#ffd700" }}/>
                  <ButtonIcon onClick={() => handleEditReview(review._id)} color="#ffd700">
                    &nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faEdit} />
                  </ButtonIcon>
                  <ButtonIcon onClick={() => handleConfirmDelete(review._id)} color="#dc3545">
                    <FontAwesomeIcon icon={faTrash} />
                  </ButtonIcon>
                </p>
                <p>{review.comment}</p>
              </div>
            ))}
            {reviews.length > visibleReviews && (
              <button onClick={() => setVisibleReviews(visibleReviews + 2)}>
                Ver más
              </button>
            )}
          </div>
        </ReviewsSection>

        <ReviewForm onSubmit={handleReviewSubmit}>
          <h2 style={{ fontSize: "20px" }}><strong>Agregar una Reseña</strong></h2>
          <label>
            Calificación:
            <RatingInput
              type="text"
              name="rating"
              value={newReview.rating}
              onChange={handleRatingChange}
              required
            />
          </label>
          <label>
            Comentario:
            <CommentTextarea
              name="comment"
              value={newReview.comment}
              onChange={handleReviewChange}
              required
            />
          </label>
          <ButtonWrapper>
            <SubmitButton type="submit">
              <FontAwesomeIcon icon={faComments} /> Subir Reseña
            </SubmitButton>
            <BackButton onClick={() => router.push('/store')}>
              <FontAwesomeIcon icon={faArrowLeft} /> Tienda
            </BackButton>
          </ButtonWrapper>
        </ReviewForm>

        <RelatedGamesSection>
          <h2 style={{ fontSize: "20px", textAlign: "center" }}><strong>Juegos Relacionados</strong></h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {relatedGames.slice(0, 3).length > 0 ? (
              relatedGames.slice(0, 3).map(relatedGame => (
                <Link key={relatedGame._id} href={`/gameDetails/${relatedGame._id}`} passHref>
                  <RelatedGameCard>
                    <RelatedGameImage src={relatedGame.image} alt={relatedGame.title} />
                    <RelatedGameTitle>{relatedGame.title}</RelatedGameTitle>
                  </RelatedGameCard>
                </Link>
              ))
            ) : (
              <p>No hay juegos relacionados.</p>
            )}
          </div>
        </RelatedGamesSection>

        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleUpdateReview}
          review={editingReview}
        />
        <ModalConfirmation
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={() => reviewToDelete && handleDeleteReview(reviewToDelete)}
        />
      </Container>
      <Footer />
    </Layout>
  );
};

export default GameDetails;