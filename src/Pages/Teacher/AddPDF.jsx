import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function AddPDF() {
  let { id } = useParams();
  console.log({ id });
 
  const [contentData, setContentData] = useState({
    contentTitle: "",
    pdf: null, // Fix the key name here
    fk_course: id,
  });
 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleChange = (event) => {
    setContentData({
      ...contentData,
      [event.target.name]: event.target.value,
    });
  };
 
  const handleFileChange = (event) => {
    setContentData({
      ...contentData,
      [event.target.name]: event.target.files[0],
    });
  };
 
  const submitForm = (event) => {
    event.preventDefault();
    const contentFormData = new FormData();
    contentFormData.append("contentTitle", contentData.contentTitle);
    contentFormData.append("pdf", contentData.pdf); // Fix the key name here
    contentFormData.append("fk_course", contentData.fk_course);
 
    axios
      .post(baseUrl + "/content/", contentFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Pdf has been inserted successfully");
        setErrorMessage("");
        console.log(response.data);
      })
      .catch((error) => {
        setErrorMessage("Pdf could not be inserted");
        setSuccessMessage("");
        console.error(error);
      });
  };
 
  return (
    <div className="formcontainer videoQuizContainer">
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form id="contentForm" action="#" method="POST">
        <h1>Content</h1>
        <div className="form-group">
          <label htmlFor="contentTitle">Title:</label>
          <input
            onChange={handleChange}
            type="text"
            id="contentTitle"
            size="65"
            name="contentTitle"
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="pdf">Pdf</label>
          <br />
          <input
            onChange={handleFileChange}
            type="file"
            id="pdf"
            name="pdf"
            required
          />
        </div>
        <div className="form-group">
          <button onClick={submitForm} type="button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
 
export default AddPDF;
