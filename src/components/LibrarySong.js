import React from 'react';




const LibrarySong = ({ song , songs , id , setCurrentSong ,  audioRef , isPlaying , setsongs}) => {

    
    const songSelectHandler = async () => {
        await setCurrentSong(song);

        // attivare la canzone attuale e disattivare le altre [util.js.active]

        const newSong = songs.map(song => {
            
            if(song.id === id){
                return{
                    ...song,
                    active:true,
                }
            }
            else {
                return{
                    ...song,
                    active:false,
                }
            }
        });

        setsongs(newSong);
        
        // gestione promise per permettere all'app di caricare la canzone prima di avviarla [evitare errore]
        if(isPlaying) audioRef.current.play();
    }   


    return(

        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ""}`}>
                <img src={song.cover} alt={song.name}></img>
                <div className="song-description">
                    <h3>{song.name}</h3>
                    <h4>{song.artist}</h4>
                </div>
        </div>


    )



}


export default LibrarySong;