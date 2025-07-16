import React, { useEffect, useState, useRef } from 'react';

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {

        const response = await fetch('https://playground.4geeks.com/sound/songs');


        if (!response.ok) {
          // una respuesta no exitosa, retorna un error si el status es distinto de 200
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }

        const data = await response.json();


        console.log('Datos de la API:', data);

        const formattedSongs = data.songs.map((song) => ({
          id: song.id,
          name: song.name,
          url: song.url,
        }));

        setSongs(formattedSongs);
      } catch (error) {
        console.error('Error al cargar las canciones', error);
      }
    };

    fetchSongs();
  }, []);

  const playSong = (index) => {
    setCurrentIndex(index);
  };

  const playNext = () => {
    setCurrentIndex((i) => (i + 1) % songs.length);
  };

  const playPrevious = () => {
    setCurrentIndex((i) => (i - 1 + songs.length) % songs.length);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((error) => {

        console.error('Error al intentar reproducir el audio:', error);
      });
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (songs.length > 0 && audioRef.current) {
      audioRef.current.src = 'https://playground.4geeks.com' + songs[currentIndex].url;

    }
  }, [currentIndex, songs]);

  return (
    <div style={{ backgroundColor: '#111', color: '#fff', height: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Reproductor de Música</h1>

      <div style={{ maxHeight: '70%', overflowY: 'auto', marginBottom: '20px' }}>
        {songs.length === 0 ? (
          <div>Cargando canciones...</div>
        ) : (
          songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => playSong(index)}
              style={{
                padding: '10px',
                backgroundColor: index === currentIndex ? '#444' : 'transparent',
                cursor: 'pointer',
                display: 'flex',
                borderBottom: '1px solid #333',
              }}
            >
              <span style={{ width: '30px' }}>{index + 1}</span>
              <span>{song.name}</span>
            </div>
          ))
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', alignItems: 'center' }}>
        <button onClick={playPrevious}>
          <i className="fa-solid fa-backward"></i>
        </button>
        <button onClick={togglePlayPause}>
          <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button onClick={playNext}>
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>

      <audio ref={audioRef} style={{ display: 'none' }} />
    </div>
  );
}