import React from 'react';
import { useCart } from '@/context/cartContext';
import {
  Container,
  Title,
  CartTable,
  CartRow,
  CartCell,
  HeaderRow,
  HeaderCell,
  ItemTitle,
  ItemPrice,
  RemoveButton,
  CheckoutButton,
  BackButton,
  ButtonContainer,
  SummaryContainer,
  SummaryText
} from '../frontend/styles/cart.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => acc + item.price, 0).toFixed(2);
  const totalItems = cart.length;

  const handleCheckout = async () => {
    try {
      const invalidItem = cart.find(item => isNaN(item.price) || item.price <= 0);
      if (invalidItem) {
        throw new Error('Invalid price detected');
      }
  
      const response = await axios.post('/api/checkout_sessions', {
        items: cart,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const session = response.data;
  
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (error) {
        console.error('Error redirigiendo a Stripe:', error);
      }
    } catch (error) {
      console.error('Error creando la sesión de pago:', error);
    }
  };
  
  return (
    <Elements stripe={stripePromise}>
      <Container>
        <Title>Tu Carrito</Title>
        {cart.length === 0 ? (
          <p style={{ color: '#fff' }}>Tu carrito está vacío.</p>
        ) : (
          <>
            <CartTable>
              <HeaderRow>
                <HeaderCell>Título</HeaderCell>
                <HeaderCell>Precio</HeaderCell>
                <HeaderCell>Eliminar</HeaderCell>
              </HeaderRow>
              {cart.map((item, index) => (
                <CartRow key={item._id} striped={index % 2 === 0}>
                  <CartCell>
                    <ItemTitle>{item.title}</ItemTitle>
                  </CartCell>
                  <CartCell>
                    <ItemPrice>${item.price}</ItemPrice>
                  </CartCell>
                  <CartCell>
                    <RemoveButton onClick={() => removeFromCart(item._id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </RemoveButton>
                  </CartCell>
                </CartRow>
              ))}
            </CartTable>
            <SummaryContainer>
              <SummaryText>Total de videojuegos: {totalItems}</SummaryText>
              <SummaryText>Total: ${totalPrice}</SummaryText>
            </SummaryContainer>
          </>
        )}
        <ButtonContainer>
          <BackButton href="/store">
            <FontAwesomeIcon icon={faArrowLeft} />
            Regresar
          </BackButton>
          {cart.length > 0 && (
            <CheckoutButton onClick={handleCheckout}>
              <FontAwesomeIcon icon={faCreditCard} />
              Pagar
            </CheckoutButton>
          )}
        </ButtonContainer>
      </Container>
    </Elements>
  );
};

export default Cart;