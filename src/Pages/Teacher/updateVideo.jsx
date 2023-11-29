// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import { useParams } from "react-router-dom"; 
// const baseUrl = 'http://127.0.0.1:8000/api';

// function updateVideo() {
//   let { videoid } = useParams(); 
//   console.log({ videoid });

//   const [contentData, setContentData] = useState({
//     'contentTitle': '',
//     'pdf': null,
//    
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     // Fetch existing data based on the ID and update the state
//     axios.get(`${baseUrl}/content/${videoid}`)
//       .then((response) => {
//         setContentData({
//           'contentTitle': response.data.contentTitle,
//           'pdf': null, // Since you don't want to update the PDF by default, keep it null
//           'fk_course': response.data.fk_course,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [id]);

//   const handleChange = (event) => {
//     setContentData({
//       ...contentData,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const handleFileChange = (event) => {
//     setContentData({
//       ...contentData,
//       [event.target.name]: event.target.files[0],
//     });
//   };

//   const submitForm = (event) => {
//     event.preventDefault();
//     const contentFormData = new FormData();
//     contentFormData.append("contentTitle", contentData.contentTitle);
//     contentFormData.append("pdf", contentData.pdf);
//     contentFormData.append("fk_course", contentData.fk_course);

//     // Use a PUT request to update the existing data
//     axios.put(`${baseUrl}/content/${id}`, contentFormData, {
//       headers: {
//         'content-type': 'multipart/form-data'
//       }
//     })
//       .then((response) => {
//         setSuccessMessage('Pdf has been updated successfully');
//         setErrorMessage('');
//         console.log(response.data);
//       })
//       .catch((error) => {
//         setErrorMessage('Pdf could not be updated');
//         setSuccessMessage('');
//         console.error(error);
//       });
//   };

//   return (
//     <div className="formcontainer videoQuizContainer">
//       {successMessage && <p className="text-success">{successMessage}</p>}
//       {errorMessage && <p className="text-danger">{errorMessage}</p>}
//       <form id="contentForm" action="#" method="POST">
//         <h1>Content</h1>
//         <div className="form-group">
//           <label htmlFor="contentTitle">Title:</label>
//           <input
//             onChange={handleChange}
//             type="text"
//             id="contentTitle"
//             size="65"
//             name="contentTitle"
//             value={contentData.contentTitle}
//             required
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="pdf">Pdf</label><br />
//           <input
//             onChange={handleFileChange}
//             type="file"
//             id="pdf"
//             name="pdf"
//             // Optional: You can set the value to an empty string if you want to allow updating the PDF
//           />
//         </div>
//         <div className="form-group">
//           <button onClick={submitForm} type="button">Update</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default updateVideo;
