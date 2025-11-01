import React from 'react';

const Popup = ({ message, type, onClose }) => {
  if (!message) return null;

  const popupStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    borderRadius: '5px',
    color: 'white',
    backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
    zIndex: 1000,
  };

  return (
    <div style={popupStyles}>
      {message}
      <button onClick={onClose} style={{ marginLeft: '15px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }}>X</button>
    </div>
  );
};

export default Popup;