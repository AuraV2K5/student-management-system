import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('https://student-management-system-yddc.onrender.com')
      .then(res => setStudents(res.data))
      .catch(err => {
        console.error(err);
        alert('Failed to fetch students');
      });
  }, []);

  const deleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      axios.delete(`https://student-management-system-yddc.onrender.com/${id}`)
        .then(() => {
          setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
          alert('Student deleted successfully!');
        })
        .catch(err => {
          console.error(err);
          alert('Failed to delete student');
        });
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Student List</h1>
      <Link to="/add-student">
        <button style={{
          marginBottom: '1rem',
          padding: '10px 20px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          Add New Student
        </button>
      </Link>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Enrollment Year</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.studentId}</td>
              <td>{student.firstName} {student.lastName}</td>
              <td>{student.email}</td>
              <td>{new Date(student.dob).toLocaleDateString('en-GB')}</td>
              <td>{student.department}</td>
              <td>{student.enrollmentYear}</td>
              <td>{student.isActive ? "Yes" : "No"}</td>
              <td>
                <Link to={`/edit-student/${student._id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteStudent(student._id)} style={{ marginLeft: '10px', color:'yellow'}}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
