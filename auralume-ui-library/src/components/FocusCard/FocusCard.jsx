import React, { useRef, useEffect } from 'react';
import './FocusCard.css';

const FocusCard = ({ cards, gridCols = 3 }) => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleMouseOver = (index) => {
      cardRefs.current.forEach((card, i) => {
        if (card) {
          card.toggleAttribute('data-not-hover', i !== index);
        }
      });
    };

    const handleMouseLeave = () => {
      cardRefs.current.forEach((card) => {
        if (card) {
          card.toggleAttribute('data-not-hover', false);
        }
      });
    };

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const overHandler = () => handleMouseOver(index);
        const leaveHandler = () => handleMouseLeave();
        
        card.addEventListener('mouseover', overHandler);
        card.addEventListener('mouseleave', leaveHandler);

        card._overHandler = overHandler;
        card._leaveHandler = leaveHandler;
      }
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card && card._overHandler && card._leaveHandler) {
          card.removeEventListener('mouseover', card._overHandler);
          card.removeEventListener('mouseleave', card._leaveHandler);
        }
      });
    };
  }, [cards]);

  return (
    <div className="focus-card-holder" style={{ '--grid-cols': gridCols }}>
      {cards.map((card, index) => (
        <div
          key={index}
          className="focus-card"
          ref={(el) => (cardRefs.current[index] = el)}
        >
          <img
            className="focus-card-image"
            src={card.image}
            alt={card.title}
          />
          <div className="focus-card-content">{card.title}</div>
        </div>
      ))}
    </div>
  );
};

export default FocusCard;