import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  padding: 1rem;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ImageWrapper = styled.div`
  flex: 2.5;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
`;

export const DetailsContent = styled.div`
  flex: 2;
`;

export const GameTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const GamePrice = styled.p`
  font-size: 1.5rem;
  color: #007bff;
  margin-bottom: 1rem;
`;

export const GameDescription = styled.p`
  margin-bottom: 1rem;
`;

export const GameInfo = styled.div`
  p {
    margin: 0.5rem 0;
  }
`;

export const ReviewsSection = styled.section`
  max-width: 1200px;
  width: 100%;
  background: #081726;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-bottom: 1rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ReviewForm = styled.form`
  max-width: 1200px;
  width: 100%;
  background: #081726;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 1rem;
  }
`;

export const RatingInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #0d253f;
  color: #fff;

  /* Elimina los botones de incremento/decremento */
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  /* Asegura que no se pueda hacer scroll */
  overflow: hidden;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #0d253f;
  color: #fff;
  resize: vertical; /* Permite cambiar el tamaño verticalmente */
`;

export const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #0056b3;
  }
`;

export const BackButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #5a6268;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const RelatedGamesSection = styled.section`
  max-width: 1200px;
  width: 100%;
  margin-top: 2rem;

  h2 {
    margin-bottom: 1rem;
  }
`;

export const RelatedGameCard = styled.div`
  flex: 1;
  background: #081726;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const RelatedGameImage = styled.img`
  width: 100%;
  height: 200px; /* Define una altura fija para todas las imágenes */
  object-fit: cover; /* Asegura que la imagen se ajuste sin distorsionarse */
  border-radius: 5px;
`;

export const RelatedGameTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 0.5rem;
`;

export const ButtonIcon = styled.button`
background: none;
border: none;
color: ${props => props.color || '#000'};
cursor: pointer;
font-size: 1rem;
margin: 0 0.25rem;
transition: color 0.3s;

&:hover {
  color: ${props => props.color ? `${props.color}CC` : '#000'};
}

&:focus {
  outline: none;
}
`;