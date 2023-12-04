// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";
 
// const baseUrl = "https://danville.pythonanywhere.com/api";
 
// function OngoingCourse() {
//   const [ongoingCourses, setOngoingCourses] = useState([]);
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
 
//         // Filter ongoing courses based on enrollment and end date
//         const currentDate = new Date();
//         const ongoing = allCourses.filter(
//           (course) =>
//             enrolledCoursesData.includes(course.id) &&
//             currentDate >= new Date(course.startDate) &&
//             currentDate <= new Date(course.endDate)&&
//             course.status === 1
//         );
 
//         setOngoingCourses(ongoing);
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
//       <h2>Ongoing Courses</h2>
//       <div className="d-flex flex-wrap">
//         {ongoingCourses.map((course) => (
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
 
// export default OngoingCourse;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const baseUrl = "https://danville.pythonanywhere.com/api";

function OngoingCourse() {
  const [ongoingCourses, setOngoingCourses] = useState([]);
  const [storedStudentId, setStoredStudentId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOngoingCourses, setFilteredOngoingCourses] = useState([]);

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

        // Filter ongoing courses based on enrollment and end date
        const currentDate = new Date();
        const ongoing = allCourses.filter(
          (course) =>
            enrolledCoursesData.includes(course.id) &&
            currentDate >= new Date(course.startDate) &&
            currentDate <= new Date(course.endDate) &&
            course.status === 1
        );

        setOngoingCourses(ongoing);
        setFilteredOngoingCourses(ongoing);
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
      setFilteredOngoingCourses(ongoingCourses); // Restore ongoing courses
      return;
    }

    // Filter ongoing courses based on the search term
    const filtered = ongoingCourses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      alert("No courses found.");
    } else {
      setFilteredOngoingCourses(filtered);
    }
  };

  return (
    <div>
      <h2 style={{marginTop: "30px" }} >Ongoing Courses</h2>
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
        {filteredOngoingCourses.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          filteredOngoingCourses.map((course) => (
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

export default OngoingCourse;
