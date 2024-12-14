import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditGameForm from '../editGames';

const EditGamePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    if (id) {
      fetchGameData(id);
    }
  }, [id]);

  const fetchGameData = async (gameId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/games/${gameId}`);
      setGameData(response.data);
    } catch (error) {
      console.error('Error fetching game data:', error);
    }
  };

  return (
    <div>
      {gameData ? <EditGameForm game={gameData} /> : <p>Cargando datos del juego...</p>}
    </div>
  );
};

export default EditGamePage;