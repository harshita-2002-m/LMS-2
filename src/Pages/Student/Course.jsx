import React from "react";
import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import CourseDescription from "./CourseDescription.jsx";
import CourseSyllabus from "./CourseSyllabus";
import CourseContent from "./CourseContent";
import Videos from "./Videos.jsx";
import Urls from "./Urls.jsx";
 
function Course() {
  let { id } = useParams();
  return (
    <div className="marginprop">
      <div classNameName="container col-md-4">
         
          <div classNameName="col-md-4">
            <div className="d-flex">
              <CourseDescription
                img="https://source.unsplash.com/300x300/?books"
                title="CourseTitle"
                link="#"
                target="_self"
              />
            </div>
          </div>
        
      </div>
      <CourseSyllabus />
      <CourseContent />
      <Videos />
      <Urls />
    </div>
  );
}

export default Course;
