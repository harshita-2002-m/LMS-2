import React, { useState, useEffect } from "react";
import Card from "./Card";

function OngoingCourses() {
  const [ongoingCourses, setOngoingCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://danville.pythonanywhere.com/api/course/");
        const courses = await response.json();

        const currentDate = new Date();

        // Filter ongoing courses based on the current date
        const ongoing = courses.filter(
          (course) => currentDate >= new Date(course.startDate) && currentDate <= new Date(course.endDate)
        );

        // Sort ongoing courses alphabetically by courseName
        const sortedOngoing = ongoing.sort((a, b) => a.courseName.localeCompare(b.courseName));

        setOngoingCourses(sortedOngoing);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="heading-margin">Ongoing Courses</h2>
      <div className="d-flex flex-wrap">
        {ongoingCourses.map((course) => (
          <Card
            key={course.id}
            id={course.id}
            img="https://source.unsplash.com/1800x900/?book" // Update this with the actual image property
            title={course.courseName}
            desc={course.description}
          />
        ))}
      </div>
    </div>
  );
}

export default OngoingCourses;