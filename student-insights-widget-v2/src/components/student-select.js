

const StudentSelect = ({ students, setSelectedStudent }) => {

    const handleOnChange = (event) => {
        const selectedId = event.target.value;
        const student = students.find((s) => s.id === selectedId);
        setSelectedStudent(student);
    };

  return (
    <div className="widget-card">
      <h2>Student Insights</h2>
      <select id="student-select" onChange={handleOnChange}>
        {students.map((student) => (
          <option  key={student.id} value={student.id}>
            {student.studentName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StudentSelect;