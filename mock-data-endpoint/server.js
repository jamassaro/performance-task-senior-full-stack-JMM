const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// This is the mock data. Notice the 'notes' field contains HTML.
// This is the source of our security vulnerability.
const mockStudentData = {
  studentId: "sid-94321",
  studentName: "Alex Garcia",
  gpa: 2.8,
  attendancePercentage: 85,
  creditsEarned: 18,
  creditsRequired: 24,
  // This is the updated "malicious" note
  notes: "Alex is struggling in Algebra II. Met with counselor on 10/25. <br><b>Action Item:</b> Schedule tutoring. <img src=x onerror=\"alert('XSS attack confirmed! This is the security flaw.')\">"
};

app.get('/api/legacy/student-insights', (req, res) => {
  console.log('Request received for student insights...');
  // Simulate network delay
  setTimeout(() => {
    res.json(mockStudentData);
  }, 500);
});

app.listen(port, () => {
  console.log(`Mock data server listening on http://localhost:${port}`);
});