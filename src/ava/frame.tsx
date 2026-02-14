import { useState } from "react";
import "./room.css";
import heart from './heart.png';

type frame = {
  imgs: string[];
  x_coord: number;
  y_coord: number;
  caption: string;
  id:string;
};

export default function Frame({ imgs, x_coord, y_coord, caption, id }: frame) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
    <img
    className="heart-button"
    src={heart}
    alt="View images"
    id={`${id}-heart`}
    style={{
        position: "absolute",
        left: `${x_coord}px`,
        top: `${y_coord}px`,
        cursor: 'pointer',
        width: '50px',
        height: '50px',
    }}
    onClick={() => setIsOpen(true)}
    />

      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={handleBackdropClick}
        >
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ✕
            </button>

            <div className="modal-image-container">
                <p className="caption">{caption}</p>
              <img
                src={imgs[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
              />
            </div>

            <div className="modal-controls">
              <button onClick={goToPrevious}>←</button>
              <span>{currentIndex + 1} / {imgs.length}</span>
              <button onClick={goToNext}>→</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}