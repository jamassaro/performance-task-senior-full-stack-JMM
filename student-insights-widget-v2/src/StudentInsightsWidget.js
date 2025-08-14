import React, { useState, useEffect } from 'react';

// Flaw #1: Component is monolithic. Data fetching is tightly coupled.
// Flaw #2: No specific loading state management. The UI just appears.
// Flaw #3: Potential for unnecessary re-renders as parent components change.
// Flaw #4 (Security): Uses dangerouslySetInnerHTML, creating an XSS vulnerability.

function StudentInsightsWidget() {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');

  // Data fetching directly inside the component
  useEffect(() => {
    fetch('http://localhost:3001/api/legacy/student-insights')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStudentData(data);
      })
      .catch(err => {
        setError('Failed to fetch student data.');
        console.error(err);
      });
  }, []); // Empty dependency array means it only runs once, but it's still not ideal.

  if (error) {
    return <div className="widget-card error">{error}</div>;
  }

  if (!studentData) {
    return <div className="widget-card loading">Loading Student Insights...</div>;
  }
  
  // A function to create the HTML object for the notes section
  const createNotesMarkup = () => {
    return { __html: studentData.notes };
  }

  return (
    <div className="widget-card">
      <h2>Student Insights: {studentData.studentName}</h2>
      <div className="widget-content">
        <p><strong>GPA:</strong> {studentData.gpa}</p>
        <p><strong>Attendance:</strong> {studentData.attendancePercentage}%</p>
        <p><strong>Credits:</strong> {studentData.creditsEarned} / {studentData.creditsRequired}</p>
        <div className="notes-section">
          <h3>Notes & Action Items</h3>
          {/* This is the critical security vulnerability */}
          <p dangerouslySetInnerHTML={createNotesMarkup()}></p>
        </div>
      </div>
    </div>
  );
}

export default StudentInsightsWidget;