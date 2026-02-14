import { useState } from 'react';

export default function RecordPlayer() {
    const audioModules = import.meta.glob<{ default: string }>('./playlist/*.mp3', { eager: true });


    
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [trackIndex, setTrackIndex] = useState<number>(0);



    const onClick = () => {
        if (currentAudio) {
            currentAudio.pause();
            setCurrentAudio(null);
            // background-color: rgb(174, 35, 35);
            const light = document.getElementById('record-player-light');
            if (light) {
                light.style.backgroundColor = 'rgb(174, 35, 35)';
            }
      
        }else{
            // select a random song from the playlist
            const audioPaths = Object.values(audioModules).map(mod => mod.default);
            const track = audioPaths[trackIndex];
            const audio = new Audio(track);
            audio.volume = 0.5;
            audio.play();
            setCurrentAudio(audio);
            setTrackIndex((prev) => (prev + 1) % audioPaths.length);

            const light = document.getElementById('record-player-light');
            console.log(light);
            if (light) {
                light.style.backgroundColor = 'rgb(47, 174, 35)';
            }
        }
    }



    return (
        <div>
            <button className="record-player-button" onClick={onClick}></button>
            <div id='record-player-light'></div>
        </div>
    )
}
