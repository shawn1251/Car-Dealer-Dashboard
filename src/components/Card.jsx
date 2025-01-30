import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    width: '200px',
  },
  title: {
    fontSize: '18px',
    margin: '0 0 8px 0',
    color: '#333',
  },
  value: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
    color: '#000',
  },
};

export default Card;