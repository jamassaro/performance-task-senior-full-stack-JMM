
import { useGetStudentInsights } from '../hooks/useGetStudentInsights';
import { useGetStudents } from '../hooks/useGetStudents';
import StudentSelect from './student-select';
import StudentInsightsWidgetComponent from './student-insight';
import Loading from './loading';
import Error from './error';
import { useState, useEffect } from 'react';


const DashboardData = () => {
    const { students, loading: studentsLoading, error: studentsError } = useGetStudents();
    const [selectedStudent, setSelectedStudent] = useState(null);
    
    useEffect(() => {
      if (students?.length > 0 && !selectedStudent) {
        setSelectedStudent(students[0]);
      }
    }, [students]);
    
    const { studentData, error: studentError, loading: studentLoading } = useGetStudentInsights(selectedStudent?.id);

    if (studentsLoading) return <Loading />;
    if (studentsError) return <Error error={studentsError} />;
    if (!students?.length) return <div>No students available</div>;

  return (
    <div>
      <StudentSelect students={students} setSelectedStudent={setSelectedStudent} />
      {studentLoading ? (
        <Loading />
      ) : studentError ? (
        <Error error={studentError} />
      ) : (
        <StudentInsightsWidgetComponent studentData={studentData} />
      )}
    </div>
  );
};

export default DashboardData;
