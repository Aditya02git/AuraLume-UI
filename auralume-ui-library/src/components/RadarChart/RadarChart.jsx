import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './RadarChart.css';

// Function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

// Function to lighten a color
const lightenColor = (hex, percent) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent));
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent));
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent));
  
  return `rgb(${r}, ${g}, ${b})`;
};

// Function to generate color variants from a base color
const generateColorVariants = (baseColor) => {
  const rgb = hexToRgb(baseColor);
  if (!rgb) {
    // Fallback to default colors if invalid hex
    return {
      primary: 'rgba(43, 176, 212, 0.2)',
      primaryBorder: 'rgb(43, 176, 212)',
      secondary: 'rgba(97, 193, 145, 0.2)',
      secondaryBorder: 'rgb(97, 193, 145)',
    };
  }

  const primary = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`;
  const primaryBorder = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  
  // Create a lighter variant for the secondary color
  const lightRgb = lightenColor(baseColor, 0.4);
  const secondaryRgb = hexToRgb(lightRgb) || rgb;
  const secondary = `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, 0.2)`;
  const secondaryBorder = lightRgb;

  return {
    primary,
    primaryBorder,
    secondary,
    secondaryBorder,
  };
};

const RadarChart = ({
  data = {},
  width = 700,
  height = 500,
  animationDuration = 2000,
  animationEasing = 'easeInOutExpo',
  showLegend = true,
  responsive = true,
  maintainAspectRatio = false,
  scaleMax = 100,
  scaleSteps = 5,
  // scaleColor = "#000000",
  color = '#2bb0d4', // Default color (blue)
  className = '',
  ...props
}) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart if it exists
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    
    // Generate color variants from the provided color
    const colors = generateColorVariants(color);

    // Apply colors to datasets
    const coloredData = {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        const isFirstDataset = index === 0;
        return {
          ...dataset,
          backgroundColor: isFirstDataset ? colors.primary : colors.secondary,
          borderColor: isFirstDataset ? colors.primaryBorder : colors.secondaryBorder,
          pointBackgroundColor: isFirstDataset ? colors.primaryBorder : colors.secondaryBorder,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: isFirstDataset ? colors.primaryBorder : colors.secondaryBorder,
        };
      })
    };

    // Create animated datasets starting from zero
    const animatedData = {
      ...coloredData,
      datasets: coloredData.datasets.map(dataset => ({
        ...dataset,
        data: new Array(dataset.data.length).fill(0) // Start from zero
      }))
    };

    const options = {
      type: 'radar',
      data: animatedData,
      options: {
        responsive: responsive,
        maintainAspectRatio: maintainAspectRatio,
        plugins: {
          legend: {
            display: showLegend,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: window.innerWidth <= 480 ? 10 : window.innerWidth <= 768 ? 12 : 14,
                weight: '600',
                family: "'freight-sans-pro', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif"
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: 'rgba(255,255,255,0.2)',
            borderWidth: 1
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: scaleMax,
            ticks: {
              stepSize: scaleMax / scaleSteps,
              color: '#99b',
              font: {
                size: window.innerWidth <= 480 ? 8 : window.innerWidth <= 768 ? 10 : 12
              },
              backdropColor: 'transparent',
              z: 1
            },
            grid: {
              color: 'rgba(200,200,200,.3)',
              lineWidth: 1
            },
            angleLines: {
              color: 'rgba(200,200,250,.3)',
              lineWidth: 1
            },
            pointLabels: {
              color: '#99b',
              font: {
                size: window.innerWidth <= 480 ? 10 : window.innerWidth <= 768 ? 12 : 14,
                family: "'freight-sans-pro', Calibri, Candara, Segoe, 'Segoe UI', Optima, Arial, sans-serif"
              }
            }
          }
        },
        animation: {
          duration: animationDuration,
          easing: animationEasing,
          onComplete: () => {
            // Animation complete callback
          }
        },
        elements: {
          line: {
            borderWidth: window.innerWidth <= 768 ? 1.5 : 2
          },
          point: {
            radius: window.innerWidth <= 768 ? 3 : 4,
            hoverRadius: window.innerWidth <= 768 ? 5 : 6
          }
        }
      }
    };

    chartRef.current = new Chart(ctx, options);

    // Animate to actual values after a short delay
    setTimeout(() => {
      if (chartRef.current) {
        chartRef.current.data.datasets = coloredData.datasets;
        chartRef.current.update('active');
      }
    }, 100);

    // Handle window resize
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, animationDuration, animationEasing, showLegend, responsive, maintainAspectRatio, scaleMax, scaleSteps, color]);

  return (
    <div className={`skillbar-container ${className}`} {...props}>
      <div className="skillbar-chart">
        <canvas
          ref={canvasRef}
          className="skillbar-canvas"
        />
      </div>
    </div>
  );
};

export default RadarChart;