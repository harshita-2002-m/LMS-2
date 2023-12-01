import React, { useState, useEffect } from "react";
import Pdf from "./Pdf"; // Assuming you have a Pdf component for rendering PDFs
import { Link, useParams } from "react-router-dom";
import axios from "axios";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function CourseContent() {
  const { id } = useParams();
  const [pdfData, setPdfData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/content/`);
        const content = response.data.filter(
          (content) => content.fk_course == id
        );
 
        setPdfData(content);
        console.log("PDF Content : ", content);
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, [id]);
 
  console.log("Current PdfData:", pdfData);
 
  return (
    <div className="container CourseSyllabus">
      <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
        <span> PDFs</span>
      </div>
      <ul className="list-group list-group-flush">
        {pdfData.map((pdf) => (
          <Pdf
            link={pdf.pdf}
            title={pdf.contentTitle}
            id={pdf.id}
            key={pdf.id}
          />
        ))}
      </ul>
    </div>
  );
}
 
export default CourseContent;
