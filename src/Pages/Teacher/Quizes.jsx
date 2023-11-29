import React, { useState, useEffect } from "react";
import Quiz from "./Quiz";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://danville.pythonanywhere.com/api";

function Quizzes() {
  const { id } = useParams();
  const [quizzesData, setQuizzesData] = useState([]);

  useEffect(() => {
    // Fetch quizzes for a particular course
    axios
      .get(`${baseUrl}/get-quizzes-by-course/${id}/`)
      .then((response) => {
        console.log(response.data);
        setQuizzesData(response.data.quizzes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        <span>Quizzes</span>
      </div>
      <ul className="list-group list-group-flush">
        {quizzesData.map((quiz) => (
          <Quiz
            link={quiz.quiz_url}
            title={quiz.title}
            id={quiz.id}
            key={quiz.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default Quizzes;
