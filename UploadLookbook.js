import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './UploadLookbook.css';

const UploadLookbook = () => {
  const location = useLocation();
  const { state } = location;
  const { name, tags, images, boosts, time } = state || {};
  
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUploadClick = () => {
   
    setUploadSuccess(true);
  };

  const handleOkClick = () => {
    setUploadSuccess(false); 
  };

  return (
    <div className="upload-lookbook-page">
      {uploadSuccess && (
        <div className="upload-success-modal">
          <p>Your Lookbook has been uploaded successfully!</p>
          <button className="ok-button" onClick={handleOkClick}>
            OK
          </button>
        </div>
      )}
      <h2 className="lookbook-title">{name}</h2>
      <div className="containerLB">
        <div className="header">
          <div className="avatar">
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </div>
          <div className="username">user_1732</div>
        </div>
        <div className="content">
          <div className="left-column">
            <div className="box box1">
              <img src={images[0]} alt="Box 1" />
            </div>
            <div className="box box2">
              <img src={images[2]} alt="Box 2" />
            </div>
          </div>
          <div className="right-column">
            <div className="box box3">
              <img src={images[1]} alt="Box 3" />
            </div>
            <div className="box box4">
              <img src={images[3]} alt="Box 4" />
            </div>
            <div className="box box5">
              <img src={images[4]} alt="Box 5" />
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="boosts">{boosts} boosts</div>
          <div className="time">{time}</div>
        </div>
        <div className="tags">
          {tags.map((tag, index) => (
            <div key={index} className="tag">
              #{tag}
            </div>
          ))}
        </div>
      </div>
      <div className="upload-button-container">
        <button className="upload-lookbook-button" onClick={handleUploadClick}>
          Upload Lookbook
        </button>
      </div>
    </div>
  );
};

export default UploadLookbook;
