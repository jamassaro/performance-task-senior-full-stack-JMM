import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const StudentInsightsWidgetComponent = React.memo(({ studentData }) => {

    const formattedGpa = useMemo(() => 
    (studentData && Number.isFinite(studentData.gpa)) ? studentData.gpa.toFixed(2) : 'N/A',
    [studentData?.gpa]
  );

  // Early return if no student data
  if (!studentData) {
    return <div>No student data available</div>;
  }

  return (
    <section 
      className="widget-card"
      aria-labelledby="student-heading"
    >
      <h2 id="student-heading">{studentData.studentName}</h2>
      <div className="widget-content">
        <p><strong>GPA:</strong> {formattedGpa}</p>
        <p><strong>Attendance:</strong> {studentData.attendancePercentage}%</p>
        <p><strong>Credits:</strong> {studentData.creditsEarned} / {studentData.creditsRequired}</p>
      </div>
      <div className="notes-section">
        <h3>Notes & Action Items</h3>
        <ReactMarkdown>{studentData.notes}</ReactMarkdown>
      </div>
    </section>
  );
});

StudentInsightsWidgetComponent.propTypes = {
  studentData: PropTypes.shape({
    studentName: PropTypes.string.isRequired,
    gpa: PropTypes.number.isRequired,
    attendancePercentage: PropTypes.number.isRequired,
    creditsEarned: PropTypes.number.isRequired,
    creditsRequired: PropTypes.number.isRequired,
    notes: PropTypes.string.isRequired,
  }),
};

export default StudentInsightsWidgetComponent;
