import React, { useEffect, useRef } from 'react';
import './ActivityGrid.css';

const ActivityGrid = ({ 
  year = new Date().getFullYear(),
  data = null,
  showReflection = false,
  className = '',
  onDayClick = null,
  style = {},
  ...props 
}) => {
  const graphRef = useRef(null);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;

    // Clear existing content
    graph.innerHTML = '';

    // Calculate offset for the first day of the year
    const firstDay = new Date(year, 0, 1);
    const dayOfWeek = firstDay.getDay();
    const offset = (dayOfWeek + 6) % 7;

    // Add empty cells for offset
    for (let i = 0; i < offset; i++) {
      const empty = document.createElement('span');
      empty.classList.add('day-empty');
      graph.appendChild(empty);
    }

    // Calculate days in year
    const daysInYear = ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 366 : 365;
    
    // Generate or use provided activity data
    const activityData = data || Array.from({ length: daysInYear }, () => Math.floor(Math.random() * 5));

    // Create day elements
    activityData.forEach((count, index) => {
      const date = getDateFromDayOfYear(index + 1, year);
      const day = document.createElement('div');
      
      day.classList.add('day', `level-${count}`, `m-${date.getMonth() + 1}`);
      day.setAttribute('title', `${date.toDateString()} - ${count} contributions`);
      day.setAttribute('data-date', date.toISOString().split('T')[0]);
      day.setAttribute('data-level', count);

      // Add click handler if provided
      if (onDayClick) {
        day.style.cursor = 'pointer';
        day.addEventListener('click', () => {
          onDayClick({
            date: date,
            level: count,
            dateString: date.toISOString().split('T')[0]
          });
        });
      }

      graph.appendChild(day);
    });
  }, [year, data, onDayClick]);

  const getDateFromDayOfYear = (dayOfYear, year) => {
    const start = new Date(year, 0, 1);
    start.setDate(start.getDate() + (dayOfYear - 1));
    return start;
  };

  return (
    <div 
      className={`activity-grid-wrapper ${className}`} 
      style={{
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style
      }}
      {...props}
    >
      <div className="activity-grid-container">
        <div id="activity-graph" ref={graphRef}></div>
      </div>
    </div>
  );
};

export default ActivityGrid;