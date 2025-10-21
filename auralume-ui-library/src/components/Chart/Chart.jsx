import React, { useEffect, useRef, useState } from 'react';
import './Chart.css';

const Chart = ({
  type = 'line',
  data = [],
  labels = [],
  color = '#000000',
  title = '',
  width = 400,
  height = 300,
  showLegend = true,
  showValues = true,
  animated = true,
  theme = 'chart-light'
}) => {
  const chartRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Generate color variants from base color
  const generateColorVariants = (baseColor) => {
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const variants = [];
    const numVariants = Math.max(data.length, labels.length, 5);

    for (let i = 0; i < numVariants; i++) {
      const factor = 1 - (i * 0.15);
      const alpha = 0.8 - (i * 0.1);
      
      const newR = Math.max(0, Math.min(255, Math.round(r * factor)));
      const newG = Math.max(0, Math.min(255, Math.round(g * factor)));
      const newB = Math.max(0, Math.min(255, Math.round(b * factor)));
      
      variants.push({
        solid: `rgb(${newR}, ${newG}, ${newB})`,
        transparent: `rgba(${newR}, ${newG}, ${newB}, ${alpha})`,
        light: `rgba(${newR}, ${newG}, ${newB}, 0.3)`
      });
    }

    return variants;
  };

  const colorVariants = generateColorVariants(color);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  // Line Chart Component
  const LineChart = () => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - 60) + 30;
      const y = height - 60 - ((value - minValue) / range) * (height - 120);
      return `${x},${y}`;
    }).join(' ');

    const pathD = data.map((value, index) => {
      const x = (index / (data.length - 1)) * (width - 60) + 30;
      const y = height - 60 - ((value - minValue) / range) * (height - 120);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    return (
      <div className={`chart-viz-container line-chart ${isVisible ? 'visible' : ''}`}>
        <svg width={width} height={height} className="line-svg">
          {/* Grid lines */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={colorVariants[0].transparent} />
              <stop offset="100%" stopColor={colorVariants[0].light} />
            </linearGradient>
          </defs>
          
          {/* Y-axis grid */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="30"
              y1={60 + (i * (height - 120) / 4)}
              x2={width - 30}
              y2={60 + (i * (height - 120) / 4)}
              stroke="rgba(200, 200, 200, 0.3)"
              strokeWidth="1"
            />
          ))}
          
          {/* Area fill */}
          <path
            d={`${pathD} L ${(data.length - 1) * (width - 60) / (data.length - 1) + 30} ${height - 60} L 30 ${height - 60} Z`}
            fill="url(#lineGradient)"
            className="area-fill"
          />
          
          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={colorVariants[0].solid}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line"
          />
          
          {/* Data points */}
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * (width - 60) + 30;
            const y = height - 60 - ((value - minValue) / range) * (height - 120);
            
            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill={colorVariants[0].solid}
                  stroke="white"
                  strokeWidth="2"
                  className="data-point"
                />
                {showValues && (
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    className="data-label"
                  >
                    {value}
                  </text>
                )}
              </g>
            );
          })}
          
          {/* X-axis labels */}
          {labels.map((label, index) => (
            <text
              key={index}
              x={(index / (labels.length - 1)) * (width - 60) + 30}
              y={height - 30}
              textAnchor="middle"
              className="axis-label"
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    );
  };

  // Pie Chart Component
  const PieChart = () => {
    const total = data.reduce((sum, value) => sum + value, 0);
    let currentAngle = -90;
    const radius = Math.min(width, height) / 2 - 40;
    const centerX = width / 2;
    const centerY = height / 2;

    return (
      <div className={`chart-viz-container pie-chart ${isVisible ? 'visible' : ''}`}>
        <svg width={width} height={height} className="pie-svg">
          {data.map((value, index) => {
            const percentage = (value / total) * 100;
            const angle = (value / total) * 360;
            
            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArc = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={index}
                d={pathData}
                fill={colorVariants[index % colorVariants.length].solid}
                stroke="white"
                strokeWidth="2"
                className="pie-slice"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            );
          })}
          
          {/* Center circle for donut effect */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius * 0.4}
            fill="white"
            className="pie-center"
          />
        </svg>
      </div>
    );
  };

  // Bar Chart Component
  const BarChart = () => {
    const maxValue = Math.max(...data);
    const barWidth = (width - 80) / data.length;
    const chartHeight = height - 100;

    return (
      <div className={`chart-viz-container bar-chart ${isVisible ? 'visible' : ''}`}>
        <svg width={width} height={height} className="bar-svg">
          {/* Y-axis grid */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + (i * chartHeight / 4)}
              x2={width - 20}
              y2={40 + (i * chartHeight / 4)}
              stroke="rgba(200, 200, 200, 0.3)"
              strokeWidth="1"
            />
          ))}
          
          {data.map((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = 40 + (index * barWidth) + barWidth * 0.1;
            const y = height - 60 - barHeight;
            const rectWidth = barWidth * 0.8;
            
            return (
              <g key={index}>
                <rect
                  x={x}
                  y={y}
                  width={rectWidth}
                  height={barHeight}
                  fill={colorVariants[index % colorVariants.length].solid}
                  className="bar-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                />
                {showValues && (
                  <text
                    x={x + rectWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="data-label"
                  >
                    {value}
                  </text>
                )}
                {labels[index] && (
                  <text
                    x={x + rectWidth / 2}
                    y={height - 30}
                    textAnchor="middle"
                    className="axis-label"
                  >
                    {labels[index]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    );
  };

  // Legend Component
  const Legend = () => {
    if (!showLegend || !labels.length) return null;

    return (
      <div className="chart-legend">
        {labels.map((label, index) => (
          <div key={index} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: colorVariants[index % colorVariants.length].solid }}
            ></span>
            <span className="legend-label">{label}</span>
            {type === 'pie' && data[index] && (
              <span className="legend-value">
                ({((data[index] / data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)
              </span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <LineChart />;
      case 'pie':
        return <PieChart />;
      case 'bar':
        return <BarChart />;
      default:
        return <LineChart />;
    }
  };

  return (
    <div className={`chart-wrapper ${theme}`} ref={chartRef}>
      {title && <h3 className="chart-title">{title}</h3>}
      <div className="chart-content">
        {renderChart()}
        <Legend />
      </div>
    </div>
  );
};

export default Chart;