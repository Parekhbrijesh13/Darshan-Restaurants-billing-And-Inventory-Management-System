import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '', 
  headerAction,
  padding = 'md',
  hover = false,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border border-gray-200 ${hoverClasses} ${className}`}
      {...props}
    >
      {(title || headerAction) && (
        <div className={`border-b border-gray-200 ${paddingClasses[padding]} flex items-center justify-between`}>
          <div>
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className={paddingClasses[padding]}>
        {children}
      </div>
    </div>
  );
};

export default Card;
