const request = require('supertest');
const express = require('express');
const cors = require('cors');
const { param, validationResult } = require('express-validator');
const { studentReportDataMock, studentData } = require('../db/data');

const app = express();
app.use(cors());

app.get('/api/legacy/student-insights', (req, res) => {
  res.json(studentData);
});

app.get('/api/student-insights/:id', 
  [
    param('id')
      .isUUID()
      .withMessage('id must be a valid UUID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const studentData = studentReportDataMock.find(student => student.id === id);

    if (!studentData) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json(studentData || {});
  }
);

describe('Student Insights API', () => {
  describe('GET /api/student-insights/:id', () => {
    it('should return student insights for valid UUID', async () => {
      const validId = '9bb35f0b-7c90-4b8e-aec1-63dc5aef68f4';
      
      const response = await request(app)
        .get(`/api/student-insights/${validId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', validId);
      expect(response.body).toHaveProperty('studentName', 'Jordan Smith');
      expect(response.body).toHaveProperty('gpa', 3.5);
      expect(response.body).toHaveProperty('attendancePercentage', 90);
      expect(response.body).toHaveProperty('creditsEarned', 20);
      expect(response.body).toHaveProperty('creditsRequired', 24);
      expect(response.body).toHaveProperty('notes');
    });

    it('should return 404 for non-existent student', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      const response = await request(app)
        .get(`/api/student-insights/${nonExistentId}`)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Student not found');
    });

    it('should return 400 for invalid UUID format', async () => {
      const invalidId = 'not-a-uuid';
      
      await request(app)
        .get(`/api/student-insights/${invalidId}`)
        .expect(400);
    });
  });

  describe('GET /api/legacy/student-insights', () => {
    it('should return list of all students', async () => {
      const response = await request(app)
        .get('/api/legacy/student-insights')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('id');
      expect(response.body[0]).toHaveProperty('studentName');
    });
  });
});
