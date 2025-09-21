import React, { useState } from 'react';

const css = `
.card {
    margin: 10px;
    width: 250px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    padding: 15px;
    text-align: center;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    margin-bottom: 15px;
    object-fit: cover;
}

.text {
    font-size: 1.1em;
    color: #333;
    margin-bottom: 10px;
}

.button-container {
    display: flex;
    justify-content: space-between;
}

.button {
    flex: 1;
    padding: 8px 15px;
    color: white;
    font-size:16px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    margin: 5px 6px 5px 6px;
}

.button-add {
    background-color: #fa688b;
}

.button-add:hover {
    background-color: #e35e7e;
    transform: scale(1.05);
}

.button-remove {
    background-color: #9e999a;
}

.button-remove:hover {
    background-color: #555;
    transform: scale(1.05);
}
`;

const ImageCard = ({ item, onAdd, onRemove }) => {
    const [visible, setVisible] = useState(true);

    const handleRemove = () => {
        setVisible(false);
        onRemove(item); 
    };

    if (!visible) {
        return null; 
    }

    return (
        <div className="card">
            <style>{css}</style>
            <img src={item.images[0]} alt={item.name} className="image" />
            <div className="button-container">
                <button className="button button-add font1" onClick={() => onAdd(item)}>View</button>
                <button className="button button-remove font1" onClick={handleRemove}>Remove</button>
            </div>
        </div>
    );
};

export default ImageCard;
