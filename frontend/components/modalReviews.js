import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

// Estilos del modal (como antes)
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: #001f3f;
  padding: 2rem;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  position: relative;
  color: white;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalBody = styled.div`
  margin: 1rem 0;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : '#dc3545'};
  color: ${props => props.primary ? '#fff' : '#fff'};
  border: 1px solid ${props => props.primary ? '#007bff' : '#dc3545'};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.primary ? '#0056b3' : '#c82333'};
    border-color: ${props => props.primary ? '#0056b3' : '#c82333'};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #0d253f;
  color: white;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  -moz-appearance: textfield;
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #444;
  background: #0d253f;
  color: white;
  width: 100%;
  box-sizing: border-box;
  font-size: 1rem;
  resize: vertical;
`;

const Modal = ({ isOpen, onClose, onUpdate, review }) => {
  const [rating, setRating] = useState(review?.rating || '');
  const [comment, setComment] = useState(review?.comment || '');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (review) {
      setRating(review.rating || '');
      setComment(review.comment || '');
    }
  }, [review]);

  const handleRatingChange = (e) => {
    const value = e.target.value;
    if (/^[1-5]?$/.test(value)) {
      setRating(value);
    }
  };

  const validateRating = (e) => {
    const value = e.target.value;
    if (value < 1) {
      setRating(1);
    } else if (value > 5) {
      setRating(5);
    } else {
      setRating(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate({ ...review, rating, comment });
    }
  };

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <h2><strong>Editar Reseña</strong></h2>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Label>
              Calificación
              <Input
                type="text"
                name="rating"
                value={rating}
                onChange={handleRatingChange}
                onBlur={validateRating}
                pattern="[1-5]"
                required
                inputMode="numeric"
              />
            </Label>
            <Label>
              Comentario
              <Textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Label>
            <ModalFooter>
              <Button primary type="submit">
                <FontAwesomeIcon icon={faSave} /> Guardar
              </Button>
              <Button onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} /> Cancelar
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;