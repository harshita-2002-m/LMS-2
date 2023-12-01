import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function EnrolledStudents() {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const { id } = useParams();
 
  // useEffect(() => {
  //   // Fetch enrollment data for the specific course
  //   const fetchEnrollmentData = async () => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/enrollment/}`);
  //       const enrolledcourse= res.data.filter(enrollment => enrollment.fk_course == id);
 
  //       setEnrollmentData(enrolledcourse);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
 
  useEffect(() => {
    const fetchEnrollmentData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/enrollment/`);
        const enrolledcourse = response.data.filter(
          (enrollment) => enrollment.fk_course == id
        );
        console.log("Enrolled students : ", enrolledcourse);
        setEnrollmentData(enrolledcourse);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEnrollmentData();
  }, [id]);
 
  useEffect(() => {
    // Fetch students data based on enrollment whenever the enrollment data changes
    const fetchStudents = async () => {
      const enrollStudents = enrollmentData.map(
        (enrollment) => enrollment.fk_student
      );
 
      if (enrollStudents.length > 0) {
        try {
          const studentsResponse = await axios.get(
            `${baseUrl}/student/?id__in=${enrollStudents.join(",")}`
          );
          setStudentsData(studentsResponse.data);
        } catch (studentsError) {
          console.error(studentsError);
        }
      }
    };
 
    fetchStudents();
  }, [enrollmentData]);
 
  const handleStudentRemove = async (studentId) => {
    try {
      // Remove the student from the enrollment table
      await axios.delete(`${baseUrl}/enrollment/${studentId}/`);
 
      // Update the local state to reflect the removal
      setEnrollmentData((prevEnrollments) =>
        prevEnrollments.filter(
          (enrollment) => enrollment.fk_student.id !== studentId
        )
      );
 
      // Optionally, you can update the studentsData state as well if needed
      // setStudentsData((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
      window.location.reload();
    } catch (error) {
      console.error("Error removing student:", error);
    }
  };
 
  return (
    <div>
      <div className="card courseContent-container mb-0 enrolledstudentsdiv">
        <div className="card-header class-header-style text-white">
          ENROLLED STUDENTS
          <button className="bttn btn-sm float-end bg-white text-dark fixed-size">
            <Link to={`/Teacher/AddStudents/${id}`}>Add Students</Link>
          </button>
        </div>
 
        {enrollmentData.length === 0 ? (
          <p className="list-group-item text-center">
            No students have been enrolled for this course yet.
          </p>
        ) : (
          <ul className="list-group list-group-flush">
            {enrollmentData.map((enrollment) => {
              // Check if the course ID in enrollment matches the current course ID
              if (enrollment.fk_course == id) {
                // Find the corresponding student for each enrollment
                const student = studentsData.find(
                  (student) => student.id === enrollment.fk_student
                );
 
                return (
                  <li
                    key={enrollment.id}
                    className="list-group-item justify-content-between align-items-center"
                  >
                    {` ${
                      student
                        ? `${student.firstName} ${student.lastName}`
                        : "Unknown"
                    }`}
                    <button
                      onClick={() => handleStudentRemove(enrollment.id)}
                      className="bttn btn-danger float-end"
                    >
                      Remove
                    </button>
                  </li>
                );
              } else {
                return null; // Skip rendering if the course ID doesn't match
              }
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
 
export default EnrolledStudents;
