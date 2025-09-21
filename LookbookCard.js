import React, { useMemo } from 'react';
import './Lookbooks.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

const LookbookCard = ({ tags, image, username = "Username", avatar }) => {
  // Generate random values only once
  const timeAgo = useMemo(() => generateRandomTimeAgo(), []);
  const likes = useMemo(() => generateRandomLikes(), []);
  const boosts = useMemo(() => generateRandomBoosts(), []);

  function generateRandomTimeAgo() {
    const times = ['16d ago', '1 month ago', '2 weeks ago', '3d ago', '2 months ago'];
    return times[Math.floor(Math.random() * times.length)];
  }

  function generateRandomLikes() {
    return Math.floor(Math.random() * 500) + 500; 
  }

  function generateRandomBoosts() {
    return (Math.random() * (3 - 0.5) + 0.5).toFixed(1) * 1000; 
  }

  return (
    <div className="lookbook-card">
      <div className="header">
        {avatar ? <img src={avatar} alt="Avatar" className="avatar" /> : <div className="avatar"></div>}
        <div className="username">{username}</div>
      </div>
      <div className="content">
        {image ? <img src={image} alt="Lookbook" className="lookbook-image" /> : <div className="box">Lookbook Content</div>}
      </div>
      <div className="footer">
        <div className="boosts" style={{ color: 'black' }}>
          <FontAwesomeIcon icon={faRocket} /> {boosts.toFixed()} boosts 
        </div>
        <div className="time" style={{ color: 'black' }}>{timeAgo}</div>
      </div>
      <div className="tags">
        {tags.map((tag, index) => (
          <span key={index} className="font1 tag">#{tag}</span>
        ))}
      </div>
    </div>
  );
};

export default LookbookCard;
