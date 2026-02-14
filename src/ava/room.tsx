import { useState } from 'react';
import './room.css';
import Frame from './frame';
import FrameLoader from './frame_loader';

export default function Room() {
  const [isNight, setIsNight] = useState(false);

  const toggleMode = () => {
    setIsNight(!isNight);
  };

  return (
    <div className={`room-container ${isNight ? 'night' : 'day'}`}>
      <button className="light-switch" onClick={toggleMode}>
        {isNight ? '' : ''}
      </button>
      <FrameLoader />
    </div>
  );
}
