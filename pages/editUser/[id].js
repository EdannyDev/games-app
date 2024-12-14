import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Form, Input, Button, BackButton, ButtonContainer, Notification, CardHeader } from '../../frontend/styles/editUser.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/api/users/${id}`, { headers: getAuthHeaders() })
        .then(response => setUser(response.data))
        .catch(error => {
          console.error('Error fetching user:', error);
          setError('Error al obtener el usuario');
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedUser = {
      name: user.name,
      email: user.email,
      role: user.role
    };
  
    axios.put(`http://localhost:5000/api/users/${id}`, updatedUser, { headers: getAuthHeaders() })
      .then(() => {
        setNotification('Cambios guardados correctamente');
        setTimeout(() => {
          router.push('/users');
        }, 3000);
      })
      .catch(error => {
        console.error('Error updating user:', error);
        setError('Error al actualizar el usuario');
      });
  };  

  const handleBack = () => {
    router.push('/users');
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      Authorization: token ? `Bearer ${token}` : '',
    };
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {notification && (
        <Notification>
          <FontAwesomeIcon icon={faCheckCircle} />
          {notification}
        </Notification>
      )}
      <Form onSubmit={handleSubmit}>
        <CardHeader>Editar Usuario</CardHeader>
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <Input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="text"
          name="role"
          value={user.role}
          onChange={handleChange}
          placeholder="Rol"
          required
        />
        <ButtonContainer>
          <Button type="submit">
            <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
            Guardar cambios
          </Button>
          <BackButton type="button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
            Regresar
          </BackButton>
        </ButtonContainer>
      </Form>
    </>
  );
};

export default EditUser;