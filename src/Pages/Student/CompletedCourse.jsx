// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";
 
// const baseUrl = "https://danville.pythonanywhere.com/api";
 
// function CompletedCourse() {
//   const [completedCourses, setCompletedCourses] = useState([]);
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
//           .filter(enrollment => enrollment.fk_student === storedStudentId)
//           .map(enrollment => enrollment.fk_course);
 
//         // Fetch all courses
//         const coursesResponse = await axios.get(baseUrl + "/course");
//         const allCourses = coursesResponse.data;
 
//         // Filter completed courses based on enrollment and end date
//         const currentDate = new Date();
//         const completed = allCourses.filter(
//           (course) =>
//             enrolledCoursesData.includes(course.id) &&
//             currentDate >= new Date(course.endDate)&&
//             course.status === 1
//         );
 
//         setCompletedCourses(completed);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
 
//     if (storedStudentId) {
//       fetchData();
//     }
//   }, [storedStudentId]);
 
//   return (
//     <div>
//       <h2>Completed Courses</h2>
//       <div className="d-flex flex-wrap">
//         {completedCourses.map((course) => (
//           <Card
//             key={course.id}
//             id={course.id}
//             img="https://source.unsplash.com/1800x900/?course&1" // Update this with the actual image property
//             title={course.courseName}
//             desc={course.description}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
 
// export default CompletedCourse;




import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const baseUrl = "https://danville.pythonanywhere.com/api";

function CompletedCourse() {
  const [completedCourses, setCompletedCourses] = useState([]);
  const [storedStudentId, setStoredStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCompletedCourses, setFilteredCompletedCourses] = useState([]);

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

        // Fetch all courses
        const coursesResponse = await axios.get(baseUrl + "/course");
        const allCourses = coursesResponse.data;

        // Filter completed courses based on enrollment and end date
        const currentDate = new Date();
        const completed = allCourses.filter(
          (course) =>
            enrolledCoursesData.includes(course.id) &&
            currentDate >= new Date(course.endDate) &&
            course.status === 1
        );

        setCompletedCourses(completed);
        setFilteredCompletedCourses(completed);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (storedStudentId) {
      fetchData();
    }
  }, [storedStudentId]);

  // Handle changes in the search term
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      // Display an alert or handle the case where the search term is empty
      alert("Enter a valid course name.");
      setFilteredCompletedCourses(completedCourses); // Restore completed courses
      return;
    }

    // Filter completed courses based on the search term
    const filtered = completedCourses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      alert("No courses found.");
    } else {
      setFilteredCompletedCourses(filtered);
    }
  };

  return (
    <div>
      <h2 style={{marginTop: "30px" }}>Completed Courses</h2>
      <div className="search-bar container" style={{ marginBottom: "10px", display: "flex", marginTop: "30px", marginRigh: "10px"}}>
        <input
          type="text"
          placeholder="Search Courses"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "850px" }}
        />
        <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
          Search
        </button>
      </div>
      <div className="d-flex flex-wrap">
        {filteredCompletedCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          filteredCompletedCourses.map((course) => (
            <Card
              key={course.id}
              id={course.id}
              img="https://source.unsplash.com/1800x900/?course&1" // Update this with the actual image property
              title={course.courseName}
              desc={course.description}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default CompletedCourse;
