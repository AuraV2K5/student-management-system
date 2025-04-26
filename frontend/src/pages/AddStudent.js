import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [student, setStudent] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('https://student-management-system-yddc.onrender.com/students', student)
      .then((response) => {
        console.log(response.data);  
        alert('Student added successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to add student');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Add Student</h1>
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Student ID', name: 'studentId' },
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Email', name: 'email' },
          { label: 'Date of Birth', name: 'dob', type: 'date' },
          { label: 'Department', name: 'department' },
          { label: 'Enrollment Year', name: 'enrollmentYear' }
        ].map(({ label, name, type = 'text' }) => (
          <div key={name} style={{ marginBottom: '1rem' }}>
            <label>{label}: </label><br />
            <input
              type={type}
              name={name}
              value={student[name]}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        ))}

        <div style={{ marginBottom: '1rem' }}>
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={student.isActive}
              onChange={handleChange}
            /> Active
          </label>
        </div>

        <button type="submit" style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}>
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
