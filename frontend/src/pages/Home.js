import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Welcome to the Student Management System</h1>
      <h3>Use the navigation to view or manage student records.</h3>
      <Link to="/students">
        <button style={{
          marginTop: '1rem',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          View Students
        </button>
      </Link>
    </div>
  );
};

export default Home;
