import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './LookbookPopup.css';

const LookbookPopup = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="overlay">
      <div className="lookbook-popup">
        <div className="popup-header">
          <h3 className="lookbooks-title">LookBooks</h3>
          <button className="create-new">Create New</button>
        </div>
        <div className="popup-content">
          <ul>
            <li>
              <span className="item-text">Formal</span>
              <Link to="/CreateLookbook">
                <FontAwesomeIcon icon={faCirclePlus} className="item-icon" />
              </Link>
            </li>
            <hr />
            <li>
              <span className="item-text">Sporty</span>
              <FontAwesomeIcon icon={faCirclePlus} className="item-icon" />
            </li>
          </ul>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LookbookPopup;












