import styled from '@emotion/styled';

export const CardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 90px auto;
  max-width: 1500px;
`;

export const ProfileForm = styled.form`
  max-width: 550px;
  margin: 0 20px;
  padding: 1em;
  border-radius: 8px;
  background-color: #081726;
  flex: 1;
`;

export const SecondProfileForm = styled(ProfileForm)`
  max-width: 900px; /* Este card será más ancho */
  background-color: #081726; /* Cambia el color de fondo del segundo card */
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 1em;
  border: 1px solid #444;
  border-radius: 4px;
  background-color: #0d253f;
  color: #fff;
  position: relative;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #005bb5;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Notification = styled.div`
  background-color: #28a745;
  color: #fff;
  padding: 10px;
  border: 1px solid #28a745;
  border-radius: 4px;
  margin-bottom: 1em;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: fadeInOut 3s ease-out;

  @keyframes fadeInOut {
    0% { opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export const CardHeader = styled.h2`
  margin-bottom: 1em;
  color: white;
`;

export const FormGroup = styled.div`
  margin-bottom: 1em;
  position: relative;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff4136;

  &:hover {
    background-color: #c0392b;
  }
`;

export const BackButton = styled(Button)`
  background-color: #2d3e50;

  &:hover {
    background-color: #1a242f;
  }
`;

export const ShowPasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 40%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;