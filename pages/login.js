import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { 
  LoginForm, 
  Form, 
  Input, 
  Button, 
  LinkText, 
  Link, 
  LinksContainer, 
  CardHeader, 
  LinksWrapper,
  Icon,
  InputContainer,
  NotificationContainer,
  NotificationHeader,
  NotificationMessage
} from '../frontend/styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState({ show: false, header: '', message: '' });
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { token, _id, role } = res.data;
  
      console.log('Token recibido:', token);
      //console.log('ID de usuario:', _id);
      //console.log('Rol de usuario:', role);
  
      localStorage.setItem('token', token);
      localStorage.setItem('userId', _id);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);
  
      // Redireccionar según el rol del usuario
      if (role === 'administrador') {
        router.push('/games');
      } else {
        router.push('/home');
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setNotification({
        show: true,
        header: 'Error al iniciar sesión',
        message: 'Correo electrónico o contraseña inválidos',
      });
    }
  };  

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  const handleForgotPasswordRedirect = () => {
    router.push('/forgot-password');
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
    <LoginForm>
      {notification.show && (
        <NotificationContainer>
          <NotificationHeader>{notification.header}</NotificationHeader>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationContainer>
      )}
      <div className="card">
        <Form onSubmit={handleLogin}>
          <CardHeader>
            <h2>Inicia Sesión</h2>
          </CardHeader>
          <InputContainer>
            <Icon icon={faEnvelope} style={{ left: '17px' }} />
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </InputContainer>
          <InputContainer>
            <Icon icon={faLock} style={{ left: '17px' }} />
            <Input 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <Icon 
              icon={passwordVisible ? faEye : faEyeSlash} 
              onClick={togglePasswordVisibility} 
              style={{ right: '17px', cursor: 'pointer' }}
            />
          </InputContainer>
          <Button type="submit">
            Iniciar Sesión
          </Button>
          <LinksContainer>
            <LinksWrapper>
              <LinkText>¿Olvidaste tu contraseña?</LinkText>
              <Link onClick={handleForgotPasswordRedirect}>Recupérala aquí</Link>
            </LinksWrapper>
            <LinksWrapper>
              <LinkText>¿No tienes cuenta?</LinkText>
              <Link onClick={handleRegisterRedirect}>Regístrate</Link>
            </LinksWrapper>
          </LinksContainer>
        </Form>
      </div>
    </LoginForm>
  );
}