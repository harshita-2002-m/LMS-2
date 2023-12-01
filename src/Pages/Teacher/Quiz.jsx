import { render, screen } from '@testing-library/react';
import App from './App';
 
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
[1:02 PM] Palak Gupta
import React, { useState, useEffect } from "react";
import axios from "axios";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function Quiz(props) {
  const [status, setStatus] = useState(1); // Default status, you may need to fetch this from the server initially
 
  useEffect(() => {
    // Fetch the initial status from the server
    axios
      .get(`${baseUrl}/get-quiz-status/${props.id}/`)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.id]);
 
  const handleDisable = () => {
    // Example: Using your API endpoint and axios
    axios
      .post(`${baseUrl}/disable-quiz/${props.id}/`)
      .then((response) => {
        setStatus(1 - status); // Toggle the status
        // If you want to set the status to 1 again when enabling, make another API request here
        if (status === 0) {
          axios
            .post(`${baseUrl}/enable-quiz/${props.id}/`)
            .then((enableResponse) => {
              // Handle success if needed
            })
            .catch((enableError) => {
              console.error(enableError);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  return (
    <div className="quizcontainer">
      <li className={`list-group-item ${status === 0 ? "disabled-quiz" : ""}`}>
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.title}
        </a>
        <button
          className="buttn btn-sm float-end text-white"
          onClick={handleDisable}
        >
          {status === 0 ? "Enable" : "Disable"}
        </button>
      </li>
    </div>
  );
}
 
export default Quiz;
 
// function Quiz(props) {
//   return (
//     <li className="list-group-item">
//       <a href={props.link} target="_blank" rel="noreferrer">
//         {props.title}
//       </a>
 
//       {/* <button
//         className="DeleteVideo btn btn-sm float-end text-white"
//         onClick={props.onDelete}
//       >
//         Delete
//       </button> */}
//       {/* <button className="">
//         <a className="text-white" href="https://forms.office.com/" target="_blank" rel="noreferrer">
//           Go
//         </a>
//       </button> */}
//       <button className="btn btn-sm float-end text-white">
//         <a className="text-white" href="" target="_blank" >
//           Disable
//         </a>
//       </button>
//     </li>
//   );
// }
// export default Quiz;
 
