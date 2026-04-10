import React, { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon, color, change, changeType }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const numericValue = typeof value === 'number' ? value : parseInt(value.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    let current = 0;
    const increment = numericValue / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [value]);

  const formatValue = () => {
    if (typeof value === 'string' && value.includes('DH')) {
      return displayValue.toLocaleString('fr-FR') + ' DH';
    }
    if (typeof value === 'string' && value.includes('%')) {
      return displayValue + '%';
    }
    if (typeof displayValue === 'number') {
      return displayValue.toLocaleString('fr-FR');
    }
    return displayValue;
  };

  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-header">
        <div className={`stat-card-icon ${color}`}>
          <i className={icon}></i>
        </div>
        {change && (
          <span className={`stat-card-change ${changeType || 'up'}`}>
            <i className={`fas fa-arrow-${changeType === 'down' ? 'down' : 'up'}`}></i>
            {change}
          </span>
        )}
      </div>
      <div className="stat-card-value">{formatValue()}</div>
      <div className="stat-card-label">{title}</div>
    </div>
  );
};

export default StatCard;
