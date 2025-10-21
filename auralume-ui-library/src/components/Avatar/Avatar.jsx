import React from 'react';
import './Avatar.css';

const Avatar = ({
  src,
  alt = 'Avatar',
  size = 'medium',
  variant = 'circle',
  fallback,
  className = '',
  onClick,
  ...props
}) => {
  const sizeClass = `avatar-${size}`;
  const variantClass = `avatar-${variant}`;
  
  const handleImageError = (e) => {
    if (fallback) {
      e.target.src = fallback;
    } else {
      e.target.style.display = 'none';
      e.target.nextSibling.style.display = 'flex';
    }
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div 
      className={`avatar ${sizeClass} ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {src ? (
        <>
          <img
            src={src}
            alt={alt}
            onError={handleImageError}
            className="avatar-image"
          />
          <div className="avatar-fallback" style={{ display: 'none' }}>
            {fallback ? (
              <img src={fallback} alt={alt} className="avatar-image" />
            ) : (
              <span className="avatar-initials">
                {getInitials(alt)}
              </span>
            )}
          </div>
        </>
      ) : (
        <div className="avatar-fallback">
          {fallback ? (
            <img src={fallback} alt={alt} className="avatar-image" />
          ) : (
            <span className="avatar-initials">
              {getInitials(alt)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const AvatarGroup = ({
  avatars = [],
  max = 5,
  size = 'medium',
  variant = 'circle',
  spacing = 'normal',
  showMore = true,
  className = '',
  onAvatarClick,
  onMoreClick,
  ...props
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;
  const spacingClass = `avatar-group-${spacing}`;

  return (
    <div 
      className={`avatar-group ${spacingClass} ${className}`}
      {...props}
    >
      {displayAvatars.map((avatar, index) => (
        <div 
          key={avatar.id || index}
          className="avatar-group-item"
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Avatar
            src={avatar.src}
            alt={avatar.alt || avatar.name}
            size={size}
            variant={variant}
            fallback={avatar.fallback}
            onClick={() => onAvatarClick && onAvatarClick(avatar, index)}
          />
          {(avatar.name || avatar.alt) && (
            <div className="avatar-tooltip">
              {avatar.name || avatar.alt}
            </div>
          )}
        </div>
      ))}
      
      {remainingCount > 0 && showMore && (
        <div 
          className={`avatar avatar-${size} avatar-${variant} avatar-more`}
          onClick={() => onMoreClick && onMoreClick(remainingCount)}
          style={{ zIndex: 0 }}
        >
          <span className="avatar-more-text">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
};

export { Avatar, AvatarGroup };
export default Avatar;