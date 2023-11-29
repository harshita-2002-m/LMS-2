import Hero from "./Hero";
function Home() {
  return (
    <div>
      <Hero />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="d-flex">
              <div className="card">
                <a href="/Student/CourseDashboard">
                  <img
                    src="https://source.unsplash.com/1800x1800/?course&1"
                    className="card-img-top"
                    alt="#"
                  />
                </a>

                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href="/Student/CourseDashboard"
                      className="btn btn-primary btn-color coursedashboardcard"
                    >
                      Courses
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex">
              <div className="card">
                <a href="https://outlook.office.com/calendar/view/workweek">
                  <img
                    src="https://source.unsplash.com/1800x1800/?course&2"
                    className="card-img-top"
                    alt="..."
                  />
                </a>
                <div className="card-body">
                  <h5 className="card-title">
                    <a
                      href="https://outlook.office.com/calendar/view/workweek"
                      className="btn btn-primary btn-color coursedashboardcard"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      My Classes
                    </a>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
