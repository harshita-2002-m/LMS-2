// import { useEffect, useState } from "react";
// import axios from "axios";
// import React from "react";
// import Card from "./Card";
// import { useParams } from "react-router-dom";
 
// const baseUrl = "https://danville.pythonanywhere.com/api";
 
// // ... (other imports and constants)
 
// function CoursesCategory(params) {
//   let { categoryId } = useParams();
 
//   const [courseData, setCourseData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [storedStudentId, setStoredStudentId] = useState(null);
 
//   useEffect(() => {
//     const fetchStudentId = () => {
//       const storedId = localStorage.getItem("studentId");
//       console.log(storedId);
//       // Parse to integer if storedId is expected to be a number
//       setStoredStudentId(parseInt(storedId, 10));
//     };
 
//     fetchStudentId();
//   }, []);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch enrollment data for the specific student
//         const enrollmentResponse = await axios.get(baseUrl + "/enrollment");
//         const enrolledCoursesData = enrollmentResponse.data
//           .filter((enrollment) => enrollment.fk_student === storedStudentId)
//           .map((enrollment) => enrollment.fk_course);
 
//         // Fetch courses for the specific category
//         const coursesResponse = await axios.get(
//           baseUrl + "/category-courses/" + categoryId
//         );
//         const coursesForInstructor = coursesResponse.data.filter((course) =>
//           enrolledCoursesData.includes(course.id)
//         );
 
//         setCourseData(coursesForInstructor);
//         setError(null);
//       } catch (error) {
//         console.log(error);
//         setError("An error occurred while fetching data.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
 
//     if (storedStudentId && categoryId) {
//       fetchData();
//     }
//   }, [categoryId, storedStudentId]);
 
//   console.log(courseData);
 
//   return (
//     <div className="d-flex">
//       {error ? (
//         <p>{error}</p>
//       ) : courseData && courseData.length > 0 ? (
//         courseData.map((course, index) => (
//           <Card
//             key={course.id}
//             id={course.id}
//             img="https://source.unsplash.com/1800x900/?course&1"
//             title={course.courseName}
//             desc={course.description}
//           />
//         ))
//       ) : (
//         <p>No courses available. Not enrolled in any course.</p>
//       )}
//     </div>
//   );
// }
 
// export default CoursesCategory;

// ----------------------------------------------------------------------------------------------//
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
// ... (other imports and constants)
 
function CoursesCategory(params) {
  let { categoryId } = useParams();
 
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [storedStudentId, setStoredStudentId] = useState(null);
 
  useEffect(() => {
    const fetchStudentId = () => {
      const storedId = localStorage.getItem("studentId");
      console.log(storedId);
      // Parse to integer if storedId is expected to be a number
      setStoredStudentId(parseInt(storedId, 10));
    };
 
    fetchStudentId();
  }, []);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch enrollment data for the specific student
        const enrollmentResponse = await axios.get(baseUrl + "/enrollment");
        const enrolledCoursesData = enrollmentResponse.data
          .filter((enrollment) => enrollment.fk_student === storedStudentId)
          .map((enrollment) => enrollment.fk_course);
 
        // Fetch courses for the specific category
        const coursesResponse = await axios.get(
          baseUrl + "/category-courses/" + categoryId
        );
        const coursesForInstructor = coursesResponse.data.filter((course) =>
          enrolledCoursesData.includes(course.id)
        );
 
        setCourseData(coursesForInstructor);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };
 
    if (storedStudentId && categoryId) {
      fetchData();
    }
  }, [categoryId, storedStudentId]);
 
  console.log(courseData);
 
  return (
    <div className="d-flex">
      {error ? (
        <p>{error}</p>
      ) : courseData && courseData.length > 0 ? (
        courseData.map((course, index) => (
          <Card
            key={course.id}
            id={course.id}
            img="https://source.unsplash.com/1800x900/?course&1"
            title={course.courseName}
            desc={course.description}
          />
        ))
      ) : (
        <p>No courses available. Not enrolled in any course.</p>
      )}
    </div>
  );
}
 
export default CoursesCategory;