import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { 
  RegisterForm, 
  Form, 
  Input, 
  Button, 
  LinkText, 
  Link, 
  LinksContainer, 
  CardHeader,
  UserIcon,
  EnvelopeIcon,
  LockIcon,
  InputContainer,
  PasswordToggleIcon,
  NotificationContainer,
  NotificationHeader,
  NotificationMessage
} from '../frontend/styles/register.styles';

const validateNewPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notification, setNotification] = useState({ show: false, header: '', message: '' });
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'Todos los campos son requeridos',
      });
      return;
    }
    
    if (!validateEmail(email)) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'Email inválido',
      });
      return;
    }
    
    if (!validateNewPassword(password)) {
      setNotification({
        show: true,
        header: 'Error',
        message: 'La contraseña no cumple con los requisitos de seguridad',
      });
      return;
    }
  
    try {
      const payload = { name, email, password };
      console.log("Enviando datos:", payload);
      const res = await axios.post('http://localhost:5000/api/users/register', payload);
      console.log(res.data);
      router.push('/login');
    } catch (err) {
      console.error("Error de respuesta:", err.response.data);
      setNotification({
        show: true,
        header: 'Error al registrarse',
        message: 'Registro fallido',
      });
    }
  };  

  const handleLoginRedirect = () => {
    router.push('/login');
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
    <RegisterForm>
      {notification.show && (
        <NotificationContainer>
          <NotificationHeader>{notification.header}</NotificationHeader>
          <NotificationMessage>{notification.message}</NotificationMessage>
        </NotificationContainer>
      )}
      <div className="card">
        <Form onSubmit={handleRegister}>
          <CardHeader>
            <h2>Regístrate</h2>
          </CardHeader>
          <InputContainer>
            <UserIcon icon={faUser} />
            <Input 
              type="text" 
              placeholder="Nombre" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </InputContainer>
          <InputContainer>
            <EnvelopeIcon icon={faEnvelope} />
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </InputContainer>
          <InputContainer>
            <LockIcon icon={faLock} />
            <Input 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            <PasswordToggleIcon 
              icon={passwordVisible ? faEye : faEyeSlash} 
              onClick={togglePasswordVisibility} 
            />
          </InputContainer>
          <Button type="submit">
            Registrarse
          </Button>
          <LinksContainer>
            <LinkText>¿Ya tienes cuenta?</LinkText>
            <Link style={{ marginLeft: '5px' }} onClick={handleLoginRedirect}>Inicia Sesión</Link>
          </LinksContainer>
        </Form>
      </div>
    </RegisterForm>
  );
}