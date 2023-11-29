// // CourseContent.js
// import React, { useState, useEffect } from "react";
// import Pdf from "./Pdf"; // Assuming you have a Pdf component for rendering PDFs
// import { Link, useParams } from 'react-router-dom';
// import axios from 'axios';

// const baseUrl = 'http://127.0.0.1:8000/api';

// function CourseContent() {
//   const { id } = useParams();
//   const [pdfData, setPdfData] = useState([]);

//    useEffect(() => {
//     try {
//       axios.get(baseUrl + "/content/")
//       .then((res) => {
//          const content = res.data.filter(content => content.fk_instructor === id);
//          setPdfData(content);
//       });
//     } catch (error) {
//       console.error(error);
//     }
//   }, [id]);

//   console.log("Current PdfData:", pdfData);

//   return (
//     <div className="container CourseSyllabus">
//       <div className="syllabusFaq faqs text-light d-flex justify-content-between align-items-center">
//        <span> PDFs</span>
//         <button className="bg-white text-dark">
//           <Link to={`/Teacher/AddPDF/${id}`} className="text-decoration-none text-dark">
//             Add Pdf
//           </Link>
//         </button>
//       </div>
//       <ul className="list-group list-group-flush">
//         {pdfData.map((pdf) => (
//           <Pdf
//             link={pdf.pdf}
//             title={pdf.contentTitle}
//             id={pdf.id}
//             key={pdf.id}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CourseContent;

// CourseContent.js
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
        <button className="bg-white text-dark">
          <Link
            to={`/Teacher/AddPDF/${id}`}
            className="text-decoration-none text-dark"
          >
            Add Pdf
          </Link>
        </button>
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
