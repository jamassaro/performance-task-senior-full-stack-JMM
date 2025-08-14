import { useState, useEffect } from 'react';

export const useGetStudentInsights = (id) => {
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    
    setLoading(true);
    fetch(`http://localhost:3001/api/student-insights/${id}`)
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return { studentData, error, loading };
};
