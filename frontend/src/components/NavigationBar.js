import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link to="/" style={linkStyle}>Home</Link>
        </li>
        <li style={liStyle}>
          <Link to="/students" style={linkStyle}>Students List</Link>
        </li>
        <li style={liStyle}>
          <Link to="/add-student" style={linkStyle}>Add Student</Link>
        </li>
      </ul>
    </nav>
  );
};

const navStyle = {
  backgroundColor: '#A6D6D6', 
  padding: '1rem',
  position: 'sticky',           
  top: '0',
  width: '100%',
  zIndex: '1000',
};

const ulStyle = {
  listStyleType: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const liStyle = {
  margin: '0 15px',
};

const linkStyle = {
  color: '#123458',             
  textDecoration: 'none',
  fontSize: '18px',
  fontWeight: 'bold',
};

export default NavigationBar;
