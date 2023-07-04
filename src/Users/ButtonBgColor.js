import React, { useState, useEffect, useRef } from 'react';

const Button = ({ id }) => {
  const [backgroundColor, setBackgroundColor] = useState('transparent');
  const buttonRef = useRef(null);

  const handleClick = () => {
    const newColor = 'rgb(254, 175, 0)';
    setBackgroundColor(newColor);
  };

  const handleOutsideClick = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      const savedColor = localStorage.getItem(id);
      if (savedColor) {
        setBackgroundColor(savedColor);
      }
    }
  };

  useEffect(() => {
    const savedColor = localStorage.getItem(id);
    if (savedColor) {
      setBackgroundColor(savedColor);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(id, backgroundColor);
  }, [id, backgroundColor]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      style={{ backgroundColor: backgroundColor }}
      onClick={handleClick}
      id={id}
    >
      Buton {id}
    </button>
  );
};

export default Button;
