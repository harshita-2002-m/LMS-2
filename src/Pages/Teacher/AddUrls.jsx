import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

function AddUrls() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create an object with the data to send to the backend
      const data = {
        UrlsTitle: title,
        urls: url,
        fk_course: id,
      };

      // Make a POST request to the backend endpoint
      await axios.post(`${baseUrl}/urls/`, data);

      // Clear the form
      setTitle("");
      setUrl("");

      setSuccessMessage("URL added successfully");
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      // Set error message
      setErrorMessage("Error adding URL. Please try again.");
      setSuccessMessage(""); // Clear any previous success message
    }
  };

  return (
    <div className="formcontainer videoQuizContainer">
      <form id="courseForm" onSubmit={handleSubmit}>
        <h3>ADD NEW URLs</h3>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div className="form-group">
          <label htmlFor="UrlsTitle">Title</label>
          <input
            type="text"
            id="UrlsTitle"
            name="UrlsTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="urls">URL</label>
          <br />
          <input
            type="text"
            id="urls"
            name="urls"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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

export default AddUrls;

//const baseUrl = 'http://127.0.0.1:8000/api';

// function AddUrls() {

//     return (
//         <div class="formcontainer videoQuizContainer">
//           <form id="courseForm" action="#" method="POST">
//             <h3>ADD NEW URLs</h3>

//             <div class="form-group">
//               <label for="courseName">Title</label>

//               <input
//                 type="text"
//                 id="courseName"
//                 size="65"
//                 name="courseName"
//                 required
//               />
//             </div>

//             <div className="form-group">
//           <label htmlFor="video">URL:</label><br />
//           <input type="file" id="video" name="video" required />
//         </div>

//             <div class="form-group">
//               <button type="submit">Submit</button>
//             </div>
//           </form>
//         </div>
//       );
// }
// export default AddUrls;
