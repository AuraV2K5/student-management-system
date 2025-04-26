import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
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
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/students/${id}`)
      .then(response => {
        const studentData = response.data;
        setStudent({
          ...studentData,
          dob: studentData.dob ? studentData.dob.split('T')[0] : ''
        });
      })
      .catch(err => {
        console.error('Error fetching student:', err);
        alert('Failed to fetch student');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`https://student-management-system-yddc.onrender.com/${id}`, student)
      .then(() => {
        alert('Student updated successfully!');
        navigate('/students');
      })
      .catch(err => {
        console.error(err);
        alert('Failed to update student');
      });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        {[ 
          { label: 'Student ID', name: 'studentId' },
          { label: 'First Name', name: 'firstName' },
          { label: 'Last Name', name: 'lastName' },
          { label: 'Email', name: 'email', type:'email'},
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
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
