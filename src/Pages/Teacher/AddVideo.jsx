import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function AddVideo() {
  let { id } = useParams();
  console.log({ id });
 
  const [videoData, setVideoData] = useState({
    videoTitle: "",
    videos: null,
    fk_course: id,
  });
 
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
 
  const handleChange = (event) => {
    setVideoData({
      ...videoData,
      [event.target.name]: event.target.value,
    });
  };
 
  const handleFileChange = (event) => {
    setVideoData({
      ...videoData,
      [event.target.name]: event.target.files[0],
    });
  };
 
  const submitForm = (event) => {
    event.preventDefault();
    const contentFormData = new FormData();
    contentFormData.append("videoTitle", videoData.videoTitle);
    contentFormData.append("videos", videoData.videos);
    contentFormData.append("fk_course", videoData.fk_course);
 
    axios
      .post(baseUrl + "/videos/", contentFormData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        setSuccessMessage("Video has been inserted successfully");
        setErrorMessage("");
        console.log(response.data);
      })
      .catch((error) => {
        setErrorMessage("Video could not be inserted");
        setSuccessMessage("");
        console.error(error);
      });
  };
 
  return (
    <div className="formcontainer videoQuizContainer">
      {successMessage && <p className="text-success">{successMessage}</p>}
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form id="contentForm" action="#" method="POST">
        <h1>Video</h1>
        <div className="form-group">
          <label htmlFor="videoTitle">Title:</label>
          <input
            onChange={handleChange}
            type="text"
            id="videoTitle"
            size="65"
            name="videoTitle"
            required
          />
        </div>
 
        <div className="form-group">
          <label htmlFor="file">Video:</label>
          <br />
          <input
            onChange={handleFileChange}
            type="file"
            id="videos"
            name="videos"
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
 
export default AddVideo;
