// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Card from "./Card";
 
// const baseUrl = "https://danville.pythonanywhere.com/api";
 
// function OngoingCourse() {
//   const data = [
//     // Your course data here
//     // ...
//   ];
 
//   const [courseData, setCourseData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [instructorId, setInstructorId] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   useEffect(() => {
//     // Fetching instructor id from local storage
//     const storedInstructorId = localStorage.getItem("instructorId");
//     console.log(storedInstructorId);
 
//     if (storedInstructorId) {
//       setInstructorId(storedInstructorId);
 
//       axios
//         .get(baseUrl + "/course/")
//         .then((res) => {
//           // Comparing instructor id from local storage with the fk_instructor from the course
//           const coursesForInstructor = res.data.filter(
//             (course) => course.fk_instructor == storedInstructorId
//           );
//           // Filter courses where the end date is greater than the current date
//           const currentDate = new Date();
//           const ongoingCourses = coursesForInstructor.filter(
//             (course) => currentDate <= new Date(course.endDate)
//           );
//           setCourseData(ongoingCourses);
//           setFilteredData(ongoingCourses);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setError(error);
//           setLoading(false);
//         });
//     }
//   }, []);
 
//   const handleSearch = () => {
//     if (!searchTerm.trim()) {
//       setError("Search term is empty or contains only whitespace.");
//       setFilteredData(courseData); // Restore ongoing courses
//       return;
//     }
 
//     const filtered = courseData.filter((course) =>
//       course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
 
//     if (filtered.length === 0) {
//         alert("No courses found.");
//     } else {
//       setError(null);
//       setFilteredData(filtered);
//     }
//   };
 
//   if (loading) {
//     return <div>Loading...</div>;
//   }
 
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }
 
//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//       className="searchBar"
//     >
//       <div
//         className="search-bar"
//         style={{ marginTop: "35px", marginBottom: "10px", display: "flex" }}
//       >
//         <input
//           type="text"
//           placeholder="Search Courses"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           style={{ width: "850px" }}
//         />
//         <button onClick={handleSearch} style={{ marginLeft: "10px" }}>
//           Search
//         </button>
//       </div>
//       <div className="d-flex flex-wrap">
//         {filteredData.length === 0 ? (
//           <p>No courses found.</p>
//         ) : (
//           filteredData.map((course) => (
//             <Card
//               key={course.id}
//               id={course.id}
//               img={
//                 course.img || "https://source.unsplash.com/1800x900/?course&3"
//               }
//               title={course.courseName}
//               desc={course.description}
//             />
//           ))
//         )}
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
  const data = [
    // Your course data here
    // ...
  ];

  const [courseData, setCourseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetching instructor id from local storage
    const storedInstructorId = localStorage.getItem("instructorId");
    console.log(storedInstructorId);

    if (storedInstructorId) {
      setInstructorId(storedInstructorId);

      axios
        .get(baseUrl + "/course/")
        .then((res) => {
          // Comparing instructor id from local storage with the fk_instructor from the course
          const coursesForInstructor = res.data.filter(
            (course) => course.fk_instructor == storedInstructorId
          );
          // Filter courses where the end date is greater than the current date
          const currentDate = new Date();
          const ongoingCourses = coursesForInstructor.filter(
            (course) => currentDate <= new Date(course.endDate)
          );
          setCourseData(ongoingCourses);
          setFilteredData(ongoingCourses);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    }
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert("Enter a valid course name."); // Show alert for empty search term
      setFilteredData(courseData); // Restore ongoing courses
      return;
    }

    const filtered = courseData.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length === 0) {
      alert("No courses found.");
    } else {
      setError(null);
      setFilteredData(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div 

      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="searchBar"
    >
      <h2 style={{marginTop: "30px" }} >Ongoing Courses</h2>
      <div
        className="search-bar"
        style={{ marginTop: "35px", marginBottom: "10px", display: "flex" }}
      >
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
        {filteredData.length === 0 ? (
          <p>No courses found.</p>
        ) : (
          filteredData.map((course) => (
            <Card
              key={course.id}
              id={course.id}
              img={
                course.img || "https://source.unsplash.com/1800x900/?course&3"
              }
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
