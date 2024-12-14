import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {
  ProfileForm,
  SecondProfileForm, // Importa el nuevo estilo
  Input,
  Button,
  ButtonContainer,
  Notification,
  CardHeader,
  FormGroup,
  DeleteButton,
  BackButton,
  ShowPasswordButton,
  CardsContainer,
} from '../frontend/styles/profile.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faCheckCircle, faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/frontend/components/layout';
import Footer from '@/frontend/components/footer';

const Profile = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', newPassword: '', confirmPassword: '', role: '' });
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState({ password: false, newPassword: false, confirmPassword: false });
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const response = await axios.get('http://localhost:5000/api/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setUser({
          ...response.data,
          password: '',
          newPassword: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error.response?.data || error.message);
        setError('Error al cargar los datos del usuario');
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (user.newPassword !== user.confirmPassword) {
      setError('Las contraseñas nuevas no coinciden');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      await axios.put('http://localhost:5000/api/users/me', {
        name: user.name,
        email: user.email,
        password: user.password,
        newPassword: user.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNotification('Perfil actualizado con éxito');
      setTimeout(() => setNotification(''), 3000); // Ocultar notificación después de 3 segundos
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data || error.message);
      setError('Error al actualizar el perfil');
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error.response?.data || error.message);
      setError('Error al eliminar la cuenta');
    }
  };

  const handleBackToHome = () => {
    if (user.role === 'administrador') {
      router.push('/games');
    } else {
      router.push('/home');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Layout>
      <CardsContainer>
        <ProfileForm onSubmit={handleUpdate}>
          <CardHeader style={{ fontSize: "28px" }}>Configuración de Perfil</CardHeader>
          {notification && (
            <Notification>
              <FontAwesomeIcon icon={faCheckCircle} />
              {notification}
            </Notification>
          )}
          {error && <div>{error}</div>}
          <FormGroup>
            <Input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type={showPassword.password ? 'text' : 'password'}
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Contraseña Actual"
            />
            <ShowPasswordButton type="button" onClick={() => togglePasswordVisibility('password')}>
              <FontAwesomeIcon icon={showPassword.password ? faEye : faEyeSlash} />
            </ShowPasswordButton>
          </FormGroup>
          <FormGroup>
            <Input
              type={showPassword.newPassword ? 'text' : 'password'}
              name="newPassword"
              value={user.newPassword}
              onChange={handleChange}
              placeholder="Nueva Contraseña"
            />
            <ShowPasswordButton type="button" onClick={() => togglePasswordVisibility('newPassword')}>
              <FontAwesomeIcon icon={showPassword.newPassword ? faEye : faEyeSlash} />
            </ShowPasswordButton>
          </FormGroup>
          <FormGroup>
            <Input
              type={showPassword.confirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar Nueva Contraseña"
            />
            <ShowPasswordButton type="button" onClick={() => togglePasswordVisibility('confirmPassword')}>
              <FontAwesomeIcon icon={showPassword.confirmPassword ? faEye : faEyeSlash} />
            </ShowPasswordButton>
          </FormGroup>
          <p style={{ marginBottom: "3px", fontSize: "20px" }}>Rol: {user.role}</p>
          <ButtonContainer>
            <Button type="submit">
              <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
              Guardar Cambios
            </Button>
            <DeleteButton type="button" onClick={handleDeleteAccount}>
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: '8px' }} />
              Eliminar Cuenta
            </DeleteButton>
            <BackButton type="button" onClick={handleBackToHome}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
              Regresar
            </BackButton>
          </ButtonContainer>
        </ProfileForm>

        <SecondProfileForm>
          <CardHeader style={{ fontSize: "28px" }}>Biblioteca de Videojuegos</CardHeader>
          {/* Aquí puedes agregar el contenido que desees para el segundo card */}
        </SecondProfileForm>
      </CardsContainer>
      <Footer />
    </Layout>
  );
};

export default Profile;