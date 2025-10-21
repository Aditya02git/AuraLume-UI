import React from 'react';
import './TileBackground.css';

const TileBackground = ({
  numberOfTiles = 250,
  tileSize = 100,
  tileColor = 'linear-gradient(135deg, #1c1c1c 0%, #2b2b2b 100%)',
  backgroundColor = '#111111',
  tileHoverColor = 'linear-gradient(135deg, #d4af37 0%, #ffea00 100%)',
  skewedAngle = 45,
  pointerMode = false,
  className= "",
  children
}) => {
  // Calculate rows and tiles per row for alternating pattern
  const calculateGrid = (total) => {
    // Approximate square root for rows
    const approxRows = Math.ceil(Math.sqrt(total));
    const tiles = [];
    let count = 0;
    
    for (let i = 0; i < approxRows && count < total; i++) {
      // Alternate between 9 and 8 tiles per row
      const tilesInRow = i % 2 === 0 ? 9 : 8;
      const rowTiles = Math.min(tilesInRow, total - count);
      tiles.push(rowTiles);
      count += rowTiles;
    }
    
    return tiles;
  };
  // if(pointerMode){
  //   pointerEvents = 'auto'
  // } else {
  //   pointerEvents = 'none'
  // }

  const rows = calculateGrid(numberOfTiles);
  const gap = Math.floor(tileSize * 0.44); // 80/180 ratio from original
  const marginTop = Math.floor(tileSize * 0.49); // 88/180 ratio from original
  const sideWidth = Math.floor(tileSize * 0.11); // 20/180 ratio from original
  const sideOffset = Math.floor(tileSize * 0.056); // 10/180 ratio from original

  const containerStyle = {
    '--tile-size': `${tileSize}px`,
    '--tile-color': tileColor,
    '--tile-hover-color': tileHoverColor,
    '--bg-color': backgroundColor,
    '--tile-gap': `${gap}px`,
    '--margin-top': `-${marginTop}px`,
    '--skewed-angle': `${skewedAngle}deg`,
    '--side-width': `${sideWidth}px`,
    '--side-offset': `${sideOffset}px`,
    '--pointer-events': `${pointerMode ? 'auto' : 'none'}`
  };

  return (
    <div className={`tile-background-wrapper ${className}`} style={containerStyle}>
      <div className="tile-background-container">
        {rows.map((tilesInRow, rowIndex) => (
          <div key={rowIndex} className="tile-row">
            {Array.from({ length: tilesInRow }).map((_, tileIndex) => (
              <div key={tileIndex} className="tile"></div>
            ))}
          </div>
        ))}
      </div>
      <div className="tile-background-content">
        {children}
      </div>
    </div>
  );
};

export default TileBackground;