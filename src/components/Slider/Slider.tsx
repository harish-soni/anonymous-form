import React, { useState, useRef, useEffect } from 'react';
import './Slider.scss';

interface SliderProps {
  children: React.ReactNode[];
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === children.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (sliderRef.current) {
      const translateValue = -currentIndex * 100;
      sliderRef.current.style.transform = `translateX(${translateValue}%)`;
    }
  }, [currentIndex]);

  return (
    <div className="slider-container">
      <button className="slider-button prev" onClick={goToPrevious}>
        ←
      </button>
      
      <div className="slider-wrapper">
        <div className="slider" ref={sliderRef}>
          {children.map((child, index) => (
            <div key={index} className="slide">
              {child}
            </div>
          ))}
        </div>
      </div>

      <button className="slider-button next" onClick={goToNext}>
        →
      </button>
    </div>
  );
};

export default Slider; 