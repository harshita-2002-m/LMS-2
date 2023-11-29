import React, { useState, useEffect } from "react";
//import Syllabus from "./Syllabus";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

export default function CourseSyllabus() {
  const { id } = useParams();
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        SYLLABUS
      </div>
      <div className="col-8 courseDes-text bg-white faqs d-flex justify-content-between align-items-center ">
        <div className="syllabusContent">
          {syllabus.map((item, index) => (
            <div key={index}>
              <h4 className="fw-bold">{item.syllabusTitle}</h4>
              <p className=""> {item.descriptions}</p>
              {/* <p className="fw-bold">Chapters {syllabus.chapters} : {syllabus.topic}</p>  */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
