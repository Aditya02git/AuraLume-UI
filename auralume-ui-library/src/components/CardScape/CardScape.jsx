import React, { useState, useRef, useEffect } from 'react';
import './CardScape.css';

const CardScape = ({ 
  cards = [], 
  className = '',
  containerMaxWidth = '1200px',
  gap = '20px',
  minCardWidth = '300px'
}) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [zoomedCard, setZoomedCard] = useState(null);
  const wrapperRef = useRef(null);
  const bgRef = useRef(null);
  const cardRefs = useRef([]);

  // Default cards if none provided
  const defaultCards = [
    {
      title: "AI Innovation",
      description: "Artificial Intelligence powers modern tools, from smart assistants to self-driving cars, reshaping industries and everyday life."
    },
    {
      title: "Web 3.0",
      description: "The next era of the internet focuses on decentralization, blockchain, and user empowerment, bringing transparency and security online."
    },
    {
      title: "Space Travel",
      description: "From reusable rockets to Mars colonization, space exploration is now closer than ever, blending science with imagination."
    },
    {
      title: "Sustainable Design",
      description: "Eco-friendly materials, renewable energy, and innovative thinking are shaping a greener and more responsible future."
    },
    {
      title: "Metaverse",
      description: "A virtual universe where people work, play, and socialize using immersive technologies like AR and VR."
    },
    {
      title: "Quantum Computing",
      description: "Harnessing the power of quantum mechanics to solve complex problems faster than classical computers ever could."
    }
  ];

  const cardsToRender = cards.length > 0 ? cards : defaultCards;

  const moveBgToCard = (cardElement) => {
    if (!cardElement || !wrapperRef.current || !bgRef.current) return;

    const cardRect = cardElement.getBoundingClientRect();
    const wrapRect = wrapperRef.current.getBoundingClientRect();
    
    const x = cardRect.left - wrapRect.left;
    const y = cardRect.top - wrapRect.top;
    
    bgRef.current.style.width = `${cardRect.width}px`;
    bgRef.current.style.height = `${cardRect.height}px`;
    bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
    bgRef.current.style.opacity = '1';
  };

  const hideBg = () => {
    if (bgRef.current) {
      bgRef.current.style.opacity = '0';
    }
  };

  const handleMouseEnter = (index) => {
    if (zoomedCard === null) {
      setCurrentIndex(index);
      const cardElement = cardRefs.current[index];
      if (cardElement) {
        moveBgToCard(cardElement);
      }
    }
  };

  const handleMouseLeave = () => {
    if (zoomedCard === null) {
      hideBg();
    }
  };

  const handleCardClick = (index) => {
    if (zoomedCard === index) {
      // Close zoom
      setZoomedCard(null);
      document.body.classList.remove('cardscape-overflow');
    } else {
      // Open zoom
      setZoomedCard(index);
      document.body.classList.add('cardscape-overflow');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && zoomedCard !== null) {
      setZoomedCard(null);
      document.body.classList.remove('cardscape-overflow');
    }
  };

  const syncBgPosition = () => {
    if (zoomedCard !== null) return;
    if (currentIndex !== null && cardRefs.current[currentIndex]) {
      moveBgToCard(cardRefs.current[currentIndex]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', syncBgPosition);
    window.addEventListener('scroll', syncBgPosition);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', syncBgPosition);
      window.removeEventListener('scroll', syncBgPosition);
      document.body.classList.remove('cardscape-overflow');
    };
  }, [currentIndex, zoomedCard]);

  return (
    <section className={`cardscape-section ${className}`}>
      <div 
        className="cardscape-container" 
        style={{ maxWidth: containerMaxWidth }}
      >
        <div 
          className="cardscape-wrapper"
          style={{ 
            gap: gap,
            gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`
          }}
          ref={wrapperRef}
        >
          <div 
            className="cardscape-hover-bg" 
            aria-hidden="true"
            ref={bgRef}
          />
          
          {cardsToRender.map((card, index) => (
            <a
              key={index}
              href="javascript:void(0)"
              className={`cardscape-card ${zoomedCard === index ? 'is-zoomed' : ''} ${zoomedCard !== null && zoomedCard !== index ? 'fade-out' : ''}`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(index);
              }}
              ref={(el) => cardRefs.current[index] = el}
            >
              <div className="cardscape-card-main">
                <div className="cardscape-card-inner">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  {card.content && zoomedCard === index && (
                    <div className="cardscape-expanded-content">
                      {typeof card.content === 'string' ? (
                        <div dangerouslySetInnerHTML={{ __html: card.content }} />
                      ) : (
                        card.content
                      )}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardScape;