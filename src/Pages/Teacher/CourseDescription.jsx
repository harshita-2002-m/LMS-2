import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
 
const baseUrl = 'https://danville.pythonanywhere.com/api';
 
function CourseDescription(props) {
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState("Add Content");
  const [isEditing, setIsEditing] = useState(false);
  const [editedEndDate, setEditedEndDate] = useState("");
  const [courseData, setCourseData] = useState([]);
 
  let { id } = useParams();
  console.log({ id });
 
  useEffect(() => {
    try {
      axios.get(baseUrl + '/detail/' + id).then((res) => {
        setCourseData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);
 
  const handleButtonClick = () => {
    // For example, you can update state, make an API call, etc.
    console.log("Button clicked");
  };
 
  const handleButtonClickEdit = async () => {
    if (isEditing) {
      try {
        // Prepare the data to be sent in the PUT request
        const updatedCourseData = {
          endDate: editedEndDate,
          // You can include other fields that are required by your serializer
          // If you want to keep the existing values for other fields, fetch them from the current courseData
          courseName: courseData[0].courseName,
          description: courseData[0].description,
          startDate: courseData[0].startDate,
          fk_category: courseData[0].fk_category,
          fk_instructor: courseData[0].fk_instructor,
        };
  
        // Perform API call to update the course details
        await axios.put(`${baseUrl}/course/${id}/`, updatedCourseData);
  
        console.log("Updating end date:", editedEndDate);
  
        // After updating, you can reset the state and exit edit mode
        setEditedEndDate("");
        setIsEditing(false);
  
        // Reload the course data to display the updated information
        axios.get(baseUrl + '/detail/' + id).then((res) => {
          setCourseData(res.data);
        });
      } catch (error) {
        console.error("Error updating end date:", error);
      }
    } else {
      console.log("Edit button clicked");
      setIsEditing(true);
    }
  };
 
  const [instructorData, setinstructorData] = useState([]);
  useEffect(() => {
    try {
      axios.get(baseUrl + '/instructor/').then((res) => {
        setinstructorData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const getInstructorName = (instructorId) => {
    // Assuming you have access to a list of instructors
    const instructor = instructorData.find((instructor) => instructor.id === instructorId);
 
    return instructor ? `${instructor.firstName} ${instructor.lastName}` : 'Unknown Instructor';
  };
 
  
  return (
    <div className="container mt-4 courseDes-Container">
      <div className="CourseDescription">
        <div className="col-4 courseDes-img-container">
          <img src={props.img} className="courseDes-img" alt="..." />
        </div>
        <div className="col-8 courseDes-text">
          {courseData.map((course) => (
            <div key={course.id}>
              <>
                <h3>{course.courseName}</h3>
                <p className="descriptionheight">{course.description}</p>
                <p className="fw-bold">
                  Created By :
                  <a className="text-decoration-none text-dark">
                    {getInstructorName(course.fk_instructor)}
                  </a>
                </p>
                <p className="fw-bold">Start Date : {course.startDate}</p>
 
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <p className="fw-bold" style={{ marginRight: "10px" }} onClick={handleButtonClickEdit}>
                      End Date: {isEditing ? (
                        <input
                          type="date"
                          value={editedEndDate}
                          onChange={(e) => setEditedEndDate(e.target.value)}
                        />
                      ) : (
                        course.endDate
                      )}
                    </p>
                    {/* <button
                      style={{
                        marginRight: "10px", // Add margin for spacing
                      }}
                      
                    >
                      <a>
                        {isEditing ? "Save" : "Edit"}
                      </a>
                    </button> */}
                  </div>
 
                <p className="fw-bold">
                  <Link to={`/Teacher/QuizDashboard/${id}`} className="text-decoration-none text-dark">
                    Quiz
                  </Link>
                </p>
                <p>
                  <button>
                    <Link to={`/Teacher/EnrolledStudents/${id}`} className="bttn">
                      Enroll the students
                    </Link>
                  </button>
                </p>
                <div className="button-container">
 
 
          <button
              style={{
              position: "absolute",
              top: "10px", // Adjust the top position as needed
              right: "10px", // Adjust the right position as needed
            }}
            onClick={handleButtonClick}
            className="btn-add-content" // Add a class for styling
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
 
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default CourseDescription;