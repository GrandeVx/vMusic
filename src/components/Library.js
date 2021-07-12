import React from 'react';
import LibrarySong from './LibrarySong';


const library = ({ songs , setCurrentSong , audioRef,isPlaying, setsongs, libraryStatus}) => {


    return(
        
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
                <h2>Libreria</h2>
                <div className="library-songs">

                    {songs.map((song) => 
                        <LibrarySong  
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        song={song}
                        id= {song.id}    
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setsongs={setsongs}
                        />
                    )}


                </div>
        </div>



    )




}

export default library;