import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faArrowLeft, faGamepad, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {
  FormContainer,
  FormLeft,
  FormRight,
  FormTitle,
  Form,
  FormField,
  Input,
  TextArea,
  ImageUploadContainer,
  UploadLabel,
  ImagePreview,
  ButtonContainer,
  SubmitButton,
  BackButton,
  Notification,
} from '../frontend/styles/editGames.styles';

const EditGameForm = ({ game }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [platform, setPlatform] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [developer, setDeveloper] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [notification, setNotification] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (game) {
      setTitle(game.title);
      setGenre(game.genre);
      setPlatform(game.platform);
      setPrice(game.price.toString());
      setDescription(game.description);
      setReleaseYear(game.releaseYear.toString());
      setDeveloper(game.developer);
      setPreviewImage(game.image);
    }
  }, [game]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  const handleReleaseYearChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setReleaseYear(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar notificación previa
    setNotification(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('genre', genre);
      formData.append('platform', platform);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('releaseYear', releaseYear);
      formData.append('developer', developer);
      if (image) {
        formData.append('image', image);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No se encontró el token');
        setNotification({ type: 'error', message: 'No se encontró el token.' });
        return;
      }

      const response = await axios.put(`http://localhost:5000/api/games/${game._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Juego editado exitosamente:', response.data);
      setNotification({ type: 'success', message: 'Juego editado exitosamente.' });
      setTimeout(() => router.push('/games'), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      console.error('Error al editar el juego:', error);
      setNotification({ type: 'error', message: 'Error al editar el juego. Intenta nuevamente.' });
    }
  };

  const handleBack = () => {
    router.push('/games');
  };

  return (
    <FormContainer>
      <FormLeft>
        <FormTitle>Editar Videojuego</FormTitle>
        <Form id="edit-game-form" onSubmit={handleSubmit}>
          <FormField>
            <Input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              placeholder="Género"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              placeholder="Plataforma"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              placeholder="Precio"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              placeholder="Año de Lanzamiento"
              value={releaseYear}
              onChange={handleReleaseYearChange}
              required
            />
          </FormField>
          <FormField>
            <Input
              type="text"
              placeholder="Desarrollador"
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              required
            />
          </FormField>
          <FormField>
            <TextArea
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </FormField>
        </Form>
      </FormLeft>
      <FormRight>
        {previewImage && <ImagePreview src={previewImage} alt="Vista previa" />}
        <ImageUploadContainer>
          <UploadLabel>
            <FontAwesomeIcon icon={faUpload} />
            &nbsp;Seleccionar Imagen
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </UploadLabel>
        </ImageUploadContainer>
        <ButtonContainer>
          <SubmitButton type="submit" form="edit-game-form">
            <FontAwesomeIcon icon={faGamepad} />
            &nbsp;Guardar Cambios
          </SubmitButton>
          <BackButton type="button" onClick={handleBack}>
            <FontAwesomeIcon icon={faArrowLeft} />
            &nbsp;Regresar
          </BackButton>
        </ButtonContainer>
      </FormRight>
      {notification && (
        <Notification type={notification.type}>
          <FontAwesomeIcon icon={notification.type === 'success' ? faCheckCircle : faExclamationCircle} />
          &nbsp;{notification.message}
        </Notification>
      )}
    </FormContainer>
  );
};

export default EditGameForm;