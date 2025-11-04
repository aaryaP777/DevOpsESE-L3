import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: "", course: "", marks: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch(() => setStudents([]));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.course || !formData.marks) return;
    const newStudent = {
      id: students.length + 1,
      ...formData,
      marks: Number(formData.marks),
    };
    setStudents([...students, newStudent]);
    setFormData({ name: "", course: "", marks: "" });
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Student Dashboard</h1>
        <p>Manage student records easily</p>
      </header>

      <section className="form-section">
        <form onSubmit={handleAddStudent}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Student Name"
            onChange={handleChange}
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            placeholder="Course"
            onChange={handleChange}
          />
          <input
            type="number"
            name="marks"
            value={formData.marks}
            placeholder="Marks"
            onChange={handleChange}
          />
          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="table-section">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.course}</td>
                  <td>{s.marks}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default App;
