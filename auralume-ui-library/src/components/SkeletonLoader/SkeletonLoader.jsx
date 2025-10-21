import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({
  width = '100%',
  height = '20px',
  borderRadius = '4px',
  count = 1,
  spacing = '10px',
  variant = 'text', // 'text', 'circular', 'rectangular', 'rounded'
  animation = 'pulse', // 'pulse', 'wave', 'none'
  theme = 'skeleton-light',
  className = '',
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'circular':
        return {
          borderRadius: '50%',
          width: height, // Make it square for perfect circle
        };
      case 'rounded':
        return {
          borderRadius: '12px',
        };
      case 'rectangular':
        return {
          borderRadius: '0',
        };
      case 'text':
      default:
        return {
          borderRadius,
        };
    }
  };

  const skeletonStyle = {
    width,
    height,
    ...getVariantStyles(),
    ...style,
  };

  const renderSkeleton = (index) => (
    <div
      key={index}
      className={`skeleton-loader ${theme} skeleton-${animation} ${className}`}
      style={{
        ...skeletonStyle,
        marginBottom: index < count - 1 ? spacing : '0',
      }}
      {...props}
    />
  );

  if (count === 1) {
    return renderSkeleton(0);
  }

  return (
    <div className="skeleton-container">
      {Array.from({ length: count }, (_, index) => renderSkeleton(index))}
    </div>
  );
};

export default SkeletonLoader;