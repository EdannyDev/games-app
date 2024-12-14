import React from 'react';
import {
  SuccessContainer,
  SuccessTitle,
  SuccessMessage,
  BackHomeButton,
} from '../frontend/styles/success.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHome } from '@fortawesome/free-solid-svg-icons';

const SuccessPage = () => {
  return (
    <SuccessContainer>
      <FontAwesomeIcon icon={faCheckCircle} size="4x" color="#38a169" />
      <SuccessTitle>¡Pago Exitoso!</SuccessTitle>
      <SuccessMessage>Gracias por tu compra. Tu transacción ha sido completada con éxito.</SuccessMessage>
        <BackHomeButton href="/store">
            <FontAwesomeIcon icon={faHome} /> Volver a la tienda
        </BackHomeButton>    
    </SuccessContainer>
  );
};

export default SuccessPage;