import React from 'react';
import {
  CanceledContainer,
  CanceledTitle,
  CanceledMessage,
  BackHomeButton,
} from '../frontend/styles/canceled.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faHome } from '@fortawesome/free-solid-svg-icons';

const CanceledPage = () => {
  return (
    <CanceledContainer>
      <FontAwesomeIcon icon={faTimesCircle} size="4x" color="#e53e3e" />
      <CanceledTitle>Pago Cancelado</CanceledTitle>
      <CanceledMessage>Tu pago ha sido cancelado. Puedes intentarlo nuevamente o regresar a la página principal.</CanceledMessage>
      <BackHomeButton href="/store">
        <FontAwesomeIcon icon={faHome} /> Volver a la Tienda
      </BackHomeButton>
    </CanceledContainer>
  );
};

export default CanceledPage;
