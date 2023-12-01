import React from "react";
//import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
const QuizDashboard = () => {
  const { id } = useParams();
  console.log("Id:", id);
  return (
    <div>
      <div className="container mt-4">
        <h3 className="pb-1 mb-4">Quiz</h3>
        <div className="row md-4 CourseDash-Card">
          <div className="col-md-6">
            <div className="d-flex">
              <div className="card courseDashboardCard">
               
                  <img
                    src="https://source.unsplash.com/1800x1800/?course&1"
                    className="card-img-top"
                    alt="#"
                  />
               
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/Teacher/NewQuiz/${id}`} className="buttn btn-primary btn-color">
                     Add New Quiz
                    </Link>
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card courseDashboardCard">
             
                <img
                  src="https://source.unsplash.com/1800x1800/?course&2"
                  className="card-img-top"
                  alt="..."
                />
             
              <div className="card-body">
                <h5 className="card-title">
                <Link to={`/Teacher/Quizes/${id}`} className="buttn btn-primary btn-color">
                     View Quizes
                    </Link>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default QuizDashboard;
