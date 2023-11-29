import React, { useState, useEffect } from "react";
//import Syllabus from "./Syllabus";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

export default function CourseSyllabus() {
  const { id } = useParams();
  console.log(id);
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${baseUrl}/get-syllabus/${id}/`)
      .then((res) => {
        setSyllabus(res.data.syllabus);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleEditClick = () => {
    // Set the initial value of editedDescription to the existing description
    const existingDescription = syllabus[0] ? syllabus[0].descriptions : "";
    setEditedDescription(existingDescription);
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(`${baseUrl}/update-syllabus/${id}/`, {
        descriptions: editedDescription,
      });

      if (response.status === 200) {
        setSyllabus((prevSyllabus) =>
          prevSyllabus.map((item) => ({
            ...item,
            descriptions: editedDescription,
          }))
        );
        setEditMode(false);
      } else {
        console.error("Error updating syllabus. Status:", response.status);
      }
    } catch (error) {
      console.error(
        "Error updating syllabus:",
        error.response?.data?.error || error.message
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        <span>SYLLABUS</span>
        <button
          className="bg-white text-dark"
          type="button"
          onClick={handleEditClick}
        >
          Edit
        </button>
      </div>
      <div className="col-8 courseDes-text">
        {syllabus.map((item, index) => (
          <div key={index}>
            <h4 className="fw-bold">{item.syllabusTitle}</h4>
            {editMode ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={5} // Set the number of rows
                cols={50}
                style={{ width: "178%" }} // Set the number of columns
              />
            ) : (
              <p className="">{item.descriptions}</p>
            )}
            {editMode && (
              <button
                className="bg-white text-dark"
                type="button"
                onClick={handleSaveClick}
              >
                Save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
