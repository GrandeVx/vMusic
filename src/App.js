import React ,{useState,useRef}from 'react';
import './styles/App.scss';
 
// Aggiunta Componenti

import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library'
import Nav from './components/nav';

import data from './data';


function App() {

  // referenze
  const audioRef = useRef(null);
    
  const [songs,setsongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);
    
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const [libraryStatus,setLibraryStatus] = useState(false);

  const timeUpdateHandler = (e) => {

    const current = e.target.currentTime;
    const duration = e.target.duration;

    // calcolo percentuale per animazione
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);

    
    setSongInfo({
        ...songInfo,
        currentTime:current,
        duration: duration,
        animationPercentage:animation,
    })


  }

    const songEndHandler = async () => {
      let currenIndex = songs.findIndex((song) => song.id === currentSong.id); 
      await setCurrentSong(songs[(currenIndex + 1) % songs.length]);
      if (isPlaying) audioRef.current.play();
    }

  return (
    
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player songs={songs} setsongs={setsongs} currentSong={currentSong} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo}/>
      <Library songs={songs} setCurrentSong={setCurrentSong} audioRef={audioRef} isPlaying setsongs={setsongs} libraryStatus={libraryStatus}/>
      <audio 
        onTimeUpdate={timeUpdateHandler} 
        onLoadedMetadata={timeUpdateHandler} // quando le informazioni si caricano sistema tutto
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>

  );



}

export default App;
