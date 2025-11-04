const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const students = [
  { id: 1, name: "Aarya Patil", course: "CSE", marks: 88 },
  { id: 2, name: "Riya Shah", course: "IT", marks: 92 },
  { id: 3, name: "Aman Verma", course: "ECE", marks: 81 },
];

app.get("/api/students", (req, res) => {
  res.json(students);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
