import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function CourseDescription(props) {
  const [buttonText /*setButtonText*/] = useState("View Content");
  const handleButtonClick = () => {
    // Define the functionality for the button here
    // For example, you can update state, make an API call, etc.
  };
 
  let { id } = useParams();
  console.log({ id });
 
  //const [teacherData,setteacherData]=useState([]);
  const [courseData, setcourseData] = useState([]);
  // let {course_id}=useParams();
 
  useEffect(() => {
    try {
      axios.get(baseUrl + "/detail/" + id).then((res) => {
        setcourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
 
  console.log(courseData);
 
  const [inData, setinData] = useState([]);
  // let {course_id}=useParams();
 
  useEffect(() => {
    try {
      axios.get(baseUrl + "/instructor/").then((res) => {
        setinData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
 
  console.log(inData);
 
  const getInstructorName = (instructorId) => {
    // Assuming you have access to a list of instructors
    const fk_intructor = inData.find(
      (intructor) => intructor.id === instructorId
    );
 
    return fk_intructor
      ? `${fk_intructor.firstName} ${fk_intructor.lastName}`
      : "Unknown Instructor";
  };
 
  return (
    <div className="container mt-4 courseDes-Container">
      <div className="CourseDescription">
        {/* course img  */}
        <div className="col-4 courseDes-img-container">
          <img src={props.img} className="courseDes-img" alt="..." />
        </div>
        {/* course title & description */}
        <div className="col-8 courseDes-text">
          {courseData.map((course) => (
            <div key={course.id}>
              <h3>{course.courseName}</h3>
              <p style={{ width: "80%" }}>{course.description}</p>
 
              <p className="fw-bold">
                Created By :
                <a
                  href="/Student/TeacherProfile"
                  className="text-decoration-none text-dark"
                >
                  {getInstructorName(course.fk_instructor)}
                </a>
              </p>
 
              <p className="fw-bold">Start Date : {course.startDate}</p>
              <p className="fw-bold">End Date : {course.endDate}</p>
            </div>
          ))}
 
          <p className="fw-bold">
            <Link
              to={`/Student/Quizes/${id}`}
              className="text-decoration-none text-dark"
            >
              Quiz
            </Link>
          </p>
 
          {/* <p className="fw-bold"><a href="/AllStudents" className="text-decoration-none text-dark">Total Students : 100</a></p> */}
 
          <p>
            {/* <Link to="/" onClick={enrollCourse} className="bttn" >Enroll in this course</Link> */}
          </p>
 
          <button
            style={{
              position: "absolute",
 
              top: "10px", // Adjust the top position as needed
 
              right: "10px", // Adjust the right position as needed
            }}
            onClick={handleButtonClick}
          >
            <a
              href="https://pursuitsoftwarebiz-my.sharepoint.com/:f:/g/personal/shresth_a_pursuitsoftware_biz/EhYExL_Qx19MgvSKctzf1q0B30lsfaJEuGzzxvotc2U14w?e=MX4JKy"
              className="text-decoration-none text-white"
              target="_blank"
              rel="noreferrer"
            >
              {buttonText}
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
export default CourseDescription;
