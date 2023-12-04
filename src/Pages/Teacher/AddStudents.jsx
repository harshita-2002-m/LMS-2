import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Multiselect } from "multiselect-react-dropdown";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function AddStudents() {
  const [studentData, setStudentData] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const { id } = useParams();
 
  useEffect(() => {
    axios
      .get(baseUrl + "/student/")
      .then((response) => {
        setStudentData(response.data);
        setOptions(
          response.data.map((student) => ({
            value: student.id,
            label: `${student.firstName} ${student.lastName}`,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
 
  const handleAddStudents = () => {
    const studentIds = selectedStudents.map((student) => student.value);
 
    const apiUrl = `${baseUrl}/add_students_to_course/`;
    const requestBody = {
      course_id: id,
      student_ids: studentIds,
    };
 
    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        setSuccessMessage("Students added successfully!");
        // Reset success message after a few seconds
        setTimeout(() => setSuccessMessage(null), 5000);
        // You can update the UI or show a success message here.
      })
      .catch((error) => {
        console.error("Error adding students:", error);
        // Handle errors appropriately.
      });
  };
 
  return (
    <div className="formcontainer margin">
      <div>
        <h1>Select Students</h1>
        <Multiselect
          options={options}
          displayValue="label"
          onSelect={(selectedList) => setSelectedStudents(selectedList)}
          onRemove={(selectedList) => setSelectedStudents(selectedList)}
        />
        <button className= "addstudentbtn" onClick={handleAddStudents}>Add Students</button>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
}
 
export default AddStudents;
