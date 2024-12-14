import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Modal from '../frontend/components/modalPassword';
import {
  ForgotPasswordForm,
  Form,
  Input,
  Button,
  Link,
  LinkText,
  NotificationContainer,
  NotificationHeader,
  NotificationMessage,
  TokenDisplay,
} from '../frontend/styles/forgot-password.styles';

// Función para validar el formato del email
const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

// Función para validar contraseñas
const validateNewPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState({ show: false, header: '', message: '', type: 'success' });
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validar el email
    if (!validateEmail(email)) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'El email ingresado es inválido',
        type: 'error',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', { email });
      setToken(response.data.token);
      setNotification({
        show: true,
        header: 'Solicitud exitosa',
        message: 'Token de restablecimiento generado',
        type: 'success',
      });
    } catch (err) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'No se pudo generar el token de restablecimiento',
        type: 'error',
      });
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleResetPassword = async () => {
    // Validar contraseñas
    if (!validateNewPassword(password)) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'La nueva contraseña no cumple con los requisitos',
        type: 'error',
      });
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        type: 'error',
      });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, {
        password,
      });
      setNotification({
        show: true,
        header: 'Contraseña restablecida',
        message: response.data.message,
        type: 'success',
      });
      setModalOpen(false); // Cierra el modal después de restablecer la contraseña
      // Redirigir al usuario al login después de un breve intervalo
      setTimeout(() => {
        router.push('/login');
      }, 2000); // Redirige después de 2 segundos (2000 milisegundos)
    } catch (error) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'No se pudo restablecer la contraseña',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <ForgotPasswordForm>
      {notification.show && (
        <NotificationContainer type={notification.type}>
          <NotificationHeader>{notification.header}</NotificationHeader>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationContainer>
      )}
      <div className="card">
        <Form onSubmit={handleForgotPassword}>
          <h2>Recuperar Contraseña</h2>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit">
            Generar token de recuperación
          </Button>
          <Link onClick={() => router.push('/login')}>
            <LinkText>Volver al Inicio de Sesión</LinkText>
          </Link>
        </Form>
        {token && (
          <TokenDisplay>
            <p>Tu token de restablecimiento es:</p>
            <p>{token}</p>
            <Button onClick={handleOpenModal}>
              Restablecer Contraseña
            </Button>
          </TokenDisplay>
        )}
      </div>
      {modalOpen && (
        <Modal
          handleCloseModal={handleCloseModal}
          handleResetPassword={handleResetPassword}
          password={password}
          confirmPassword={confirmPassword}
          setPassword={setPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
    </ForgotPasswordForm>
  );
};

export default ForgotPassword;