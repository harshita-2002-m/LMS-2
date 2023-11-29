import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

function AddQuiz() {
  const [title, setTitle] = useState("");
  const [quizUrl, setQuizUrl] = useState("");
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the data to send to the backend
      const data = {
        title: title,
        quiz_url: quizUrl,
        fk_course: id,
      };

      // Make a POST request to the backend endpoint
      await axios.post(`${baseUrl}/quizes/`, data);

      // Clear the form
      setTitle("");
      setQuizUrl("");

      setSuccessMessage("Quiz added successfully");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      // Set error message
      setErrorMessage("Error adding quiz. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="formcontainer videoQuizContainer">
      <form id="quizForm" onSubmit={handleSubmit}>
        <h3>ADD NEW QUIZ</h3>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quizUrl">Quiz URL</label>
          <br />
          <input
            type="text"
            id="quizUrl"
            name="quizUrl"
            value={quizUrl}
            onChange={(e) => setQuizUrl(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddQuiz;
