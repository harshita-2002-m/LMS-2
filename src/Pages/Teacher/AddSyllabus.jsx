import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function AddSyllabus() {
  const [syllabusTitle, setSyllabusTitle] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    try {
      // Create an object with the data to send to the backend
      const data = {
        syllabusTitle: syllabusTitle,
        descriptions: descriptions,
        fk_course: id,
      };
 
      // Make a POST request to the backend endpoint
      await axios.post(`${baseUrl}/syllabus/`, data);
 
      // Clear the form
      setSyllabusTitle("");
      setDescriptions("");
 
      setSuccessMessage("Syllabus added successfully");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      // Set error message
      setErrorMessage("Error adding syllabus. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };
 
  return (
    <div className="formcontainer videoQuizContainer">
      <form id="syllabusForm" onSubmit={handleSubmit}>
        <h3>ADD NEW SYLLABUS</h3>
 
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
 
        <div className="form-group">
          <label htmlFor="syllabusTitle">Title</label>
          <input
            type="text"
            id="syllabusTitle"
            name="syllabusTitle"
            value={syllabusTitle}
            onChange={(e) => setSyllabusTitle(e.target.value)}
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="descriptions">Descriptions</label>
          <br />
          <textarea
            id="descriptions"
            name="descriptions"
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
            required
          ></textarea>
        </div>
 
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
 
export default AddSyllabus;
