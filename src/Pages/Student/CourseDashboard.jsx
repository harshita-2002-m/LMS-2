import React from "react";
const CourseDashboard = () => {
  return (
    <div>
      <div className="container mt-4">
        <h3 className="pb-1 mb-4">Course Panel</h3>
        <div className="row md-4 CourseDash-Card">
          <div className="col-md-4">
            <div className="d-flex">
              <div className="card courseDashboardCard">
                <a href="/Student/Categories">
                  <img
                    src="https://source.unsplash.com/1800x1800/?course&1"
                    className="card-img-top"
                    alt="#"
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href="/Student/Categories"
                      className="btn btn-primary btn-color coursedashboardcardplus"
                    >
                      Courses Category
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card courseDashboardCard">
              <a href="/Student/CourseList">
                <img
                  src="https://source.unsplash.com/1800x1800/?course&2"
                  className="card-img-top"
                  alt="..."
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a
                    href="/Student/OngoingCourse"
                    className="btn btn-primary btn-color coursedashboardcard"
                  >
                    Ongoing Course
                  </a>
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card courseDashboardCard">
              <a href="/Student/CourseList">
                <img
                  src="https://source.unsplash.com/1800x1800/?course&3"
                  className="card-img-top"
                  alt="..."
                />
              </a>
              <div className="card-body">
                <h5 className="card-title">
                  <a
                    href="/Student/CompletedCourse"
                    className="btn btn-primary btn-color coursedashboardcardplus"
                  >
                    Completed Course
                  </a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CourseDashboard;
