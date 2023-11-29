import React from "react";
import { useParams } from "react-router-dom";
import CourseDescription from "./CourseDescription.jsx";
import CourseSyllabus from "./CourseSyllabus";
import CourseContent from "./CourseContent";
import Videos from "./Videos.jsx";
import Urls from "./Urls.jsx";

function Course() {
  let { id } = useParams();
  return (
    <div>
      <div classNameName="container">
        <div classNameName="row">
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
      </div>
      {/* <div className = "container progressContainer">
          <div className="progress progress-width bg-dark" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar progressBar-style">25%</div>
          </div>
        </div> */}

      <CourseSyllabus />
      <CourseContent />

      <Videos />
      <Urls />
    </div>
  );
}

export default Course;
