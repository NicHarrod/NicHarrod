import { useState } from 'react';
import './room.css';
import meow_sound from './meow.mp3'

import FrameLoader from './frame_loader';
import RecordPlayer from './record_player';


export default function Room() {
  const [isNight, setIsNight] = useState(false);

  const toggleMode = () => {
    setIsNight(!isNight);
    if (!isNight) {
      // find the heart button with id snow_night-heart
      const nightHeart = document.getElementById('snow_night-heart');
      if (nightHeart) {
        nightHeart.classList.add('is-visible');
      }
      const dayHeart = document.getElementById('outside_day-heart');
      if (dayHeart) {
        dayHeart.classList.add('is-invisible');
      }
    } else {
      const nightHeart = document.getElementById('snow_night-heart');
      if (nightHeart) {
        nightHeart.classList.remove('is-visible');
      }
      const dayHeart = document.getElementById('outside_day-heart');
      if (dayHeart) {
        dayHeart.classList.remove('is-invisible');
      }
  }
};
  const meow = () => {
    const audio = new Audio(meow_sound);
    audio.play();
  };

  return (
    <div className={`room-container ${isNight ? 'night' : 'day'}`}>
      <FrameLoader />
      <button className="light-switch" onClick={toggleMode}>
        {isNight ? '' : ''}
      </button>
      <button className='Meow' onClick={meow}></button>
      <RecordPlayer />
    </div>
  );
}
