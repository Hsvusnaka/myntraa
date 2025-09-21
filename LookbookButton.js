import React from 'react';
import './LookbookButton.css';

const LookbookButton = ({ onClick }) => {
  return (
    <button className="lookbook-button" onClick={onClick}>
      Add to Your Lookbook
    </button>
  );
};

export default LookbookButton;


