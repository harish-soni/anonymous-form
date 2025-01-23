import React from 'react';
import './BorderAnimation.scss';

interface BorderAnimationProps {
  active: boolean;
  children: React.ReactNode;
}

const BorderAnimation: React.FC<BorderAnimationProps> = ({ active, children }) => {
  return (
    <div className={` border-animation ${active ? 'active' : ''}`}>
      {children}
      <div className="border" />
    </div>
  );
};

export default BorderAnimation; 