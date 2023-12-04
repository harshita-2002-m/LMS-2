import React, { useState, useEffect } from "react";
//import Syllabus from "./Syllabus";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

export default function CourseSyllabus() {
  //const navigate = useNavigate();
  const { id } = useParams();

  const [syllabusId, setSyllabusId] = useState(null);
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [hasSyllabus, setHasSyllabus] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/get-syllabus/${id}/`)
      .then((res) => {
        const { syllabus_id, syllabus } = res.data;
        setSyllabus(syllabus);
        setSyllabusId(Number(syllabus_id));
        console.log("Syllabus D  :" + syllabus_id);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    // Check if syllabus exists for the specified course
    axios
      .get(`${baseUrl}/has-syllabus/${id}/`)
      .then((res) => {
        setHasSyllabus(res.data.hasSyllabus);
      })
      .catch((error) => {
        console.error("Error checking syllabus:", error);
      });
  }, [id]);
  console.log("syllabus id", syllabusId);

  const handleEditClick = (syllabusId, existingDescription) => {
    // Set the initial value of editedDescription to the existing description
    setSyllabusId(syllabusId);
    setEditedDescription(existingDescription);
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Update the existing record in the database with the new description
      await axios.put(`${baseUrl}/update-syllabus/${syllabusId}/`, {
        descriptions: editedDescription,
      });

      // After saving, update the local state and exit edit mode
      setSyllabus((prevSyllabus) =>
        prevSyllabus.map((item) => ({
          ...item,
          descriptions: editedDescription,
        }))
      );
      setEditMode(false);
    } catch (error) {
      console.error("Error updating syllabus:", error);
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
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center ">
        <span>SYLLABUS</span>
        <div className="syllabuseditbtn">
          {syllabus.map((item, index) => (
            <button
              key={index}
              className="bg-white text-dark syllabuseditbtn"
              type="button"
              onClick={() => handleEditClick(item.id, item.descriptions)}
            >
              Edit
            </button>
          ))}
          {!hasSyllabus && (
            <button>
              <Link
                to={`/Teacher/AddSyllabus/${id}`}
                className="buttn bg-white text-dark"
              >
                Add
              </Link>
            </button>
          )}
        </div>
      </div>
      <div className="col-8 syllabuscontainer bg-white">
        {syllabus.map((item, index) => (
          <div key={index}>
            <h4 className="fw-bold">{item.syllabusTitle}</h4>
            {editMode ? (
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                rows={5}
                cols={50}
                style={{ width: "178%" }}
              />
            ) : (
              <p>{item.descriptions}</p>
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
