import React, { useState } from 'react';
import './App.css';

function App() {
  // Simple state to hold our students
  const [students, setStudents] = useState([
    { id: 1, name: 'Aman', score: 78 },
    { id: 2, name: 'Rahul', score: 45 },
    { id: 3, name: 'Karan', score: 90 },
    { id: 4, name: 'Rohan', score: 32 },
  ]);

  const [nameInput, setNameInput] = useState('');
  const [scoreInput, setScoreInput] = useState('');

  // 1. Calculate stats using a simple "for" loop (very student-friendly)
  let total = students.length;
  let passedCount = 0;
  let totalScore = 0;

  for (let i = 0; i < students.length; i++) {
    if (students[i].score >= 40) {
      passedCount++;
    }
    totalScore += Number(students[i].score);
  }

  let average = 0;
  if (total > 0) {
    average = Math.floor(totalScore / total);
  }

  // 2. Add a new student
  const addStudent = () => {
    if (nameInput === '' || scoreInput === '') {
      alert('Please enter both a name and a score!');
      return;
    }

    const newStudent = {
      id: Math.random(), // A basic way to make a random ID
      name: nameInput,
      score: Number(scoreInput)
    };

    // Add to the array and clear inputs
    setStudents([...students, newStudent]);
    setNameInput('');
    setScoreInput('');
  };

  // 3. Instantly update score when typing in the box
  const updateScore = (id, newScoreValue) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        return { ...student, score: newScoreValue };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  return (
    <div className="main-container">
      <h2>STUDENT SCOREBOARD</h2>

      {/* Add Student Form */}
      <div className="box add-box">
        <p>Register Student</p>
        <input 
          type="text" 
          placeholder="Name" 
          value={nameInput} 
          onChange={(e) => setNameInput(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Score" 
          value={scoreInput} 
          onChange={(e) => setScoreInput(e.target.value)} 
        />
        <button onClick={addStudent}>+ ADD</button>
      </div>

      {/* Stats Display */}
      <div className="box stats-box">
        <div className="stat">
          <p>Total: {total}</p>
        </div>
        <div className="stat">
          <p>Passed: {passedCount}</p>
        </div>
        <div className="stat">
          <p>Average Score: {average}</p>
        </div>
      </div>

      {/* Table Display */}
      <div className="box table-box">
        <div className="table-header">
          <span className="col">Name</span>
          <span className="col">Score</span>
          <span className="col">Status</span>
          <span className="col">Update</span>
        </div>

        {students.map((student) => {
          let isPass = student.score >= 40;
          
          return (
            <div className="table-row" key={student.id}>
              <span className="col">{student.name}</span>
              <span className="col score-text">{student.score}</span>
              <span className="col">
                {isPass ? (
                  <span className="pass-badge">PASS</span>
                ) : (
                  <span className="fail-badge">FAIL</span>
                )}
              </span>
              <span className="col">
                <input 
                  type="number" 
                  value={student.score} 
                  onChange={(e) => updateScore(student.id, e.target.value)}
                  className="edit-input"
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;