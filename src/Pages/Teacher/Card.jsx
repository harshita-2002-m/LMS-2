

// -----------------------------------------//
// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// function Card(props) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [popupHeight, setPopupHeight] = useState("auto");
//   const popupRef = useRef(null);

//   useEffect(() => {
//     if (popupRef.current) {
//       setPopupHeight(popupRef.current.clientHeight + "px");
//     }
//   }, [props.desc, isHovered]);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   // Function to limit the description to the first 15 words
//   const truncateDescription = (description) => {
//     const words = description.split(' ');
//     const truncatedDescription = words.slice(0, 10).join(' ');
//     return truncatedDescription + (words.length > 10 ? '...' : '');
//   };

//   return (
//     <div
//       className="card"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <img src={props.img} className="card-img-top" alt="..." />
//       <div className="card-body">
//         <h5 className="card-title marginprop">{props.title}</h5>
//         {/* Show description only when not hovered */}
//         {!isHovered && (
//           <p className="card-text description-hidden">{truncateDescription(props.desc)}</p>
//         )}
//         <Link to={`/Teacher/detail/${props.id}`} className="btn btn-primary btn-color knowMorebtn">
//           Know More &rarr;
//         </Link>

//         {isHovered && (
//           <div
//             className="popup"
//             style={{ height: popupHeight }}
//             ref={popupRef}
//           >
//             <p>{truncateDescription(props.desc)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Card;



// import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
 
// function Card(props) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [popupHeight, setPopupHeight] = useState("auto");
//   const popupRef = useRef(null);
 
//   useEffect(() => {
//     if (popupRef.current) {
//       setPopupHeight(popupRef.current.clientHeight + "px");
//     }
//   }, [props.desc, isHovered]);
 
//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };
 
//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };
 
//   // Function to limit the description to the first 15 words
//   const truncateDescription = (description) => {
//     const words = description.split(" ");
//     const truncatedDescription = words.slice(0, 10).join(" ");
//     return truncatedDescription + (words.length > 10 ? "..." : "");
//   };
 
//   return (
//     <div
//       className="card"
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       <img src={props.img} className="card-img-top" alt="..." />
//       <div className="card-body">
//         <h5 className="card-title marginprop">{props.title}</h5>
//         {/* Show description only when not hovered */}
//         {!isHovered && (
//           <p className="card-text description-hidden">
//             {truncateDescription(props.desc)}
//           </p>
//         )}
//         <Link
//           to={`/Teacher/detail/${props.id}`}
//           className="btn btn-primary btn-color knowMorebtn"
//         >
//           Know More &rarr;
//         </Link>
 
//         {isHovered && (
//           <div className="popup" style={{ height: popupHeight }} ref={popupRef}>
//             <p>{truncateDescription(props.desc)}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
 
// export default Card;

import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupHeight, setPopupHeight] = useState("auto");
  const popupRef = useRef(null);
  const [status, setStatus] = useState(1); // Default status
 
  useEffect(() => {
    // Fetch the initial status from the server
    axios
      .get(`${baseUrl}/get_course_status/${props.id}/`)
      .then((response) => {
        setStatus(response.data.status);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [props.id]);
 
  useEffect(() => {
    if (popupRef.current) {
      setPopupHeight(popupRef.current.clientHeight + "px");
    }
  }, [props.desc, isHovered]);
 
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
 
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
 
  const truncateDescription = (description) => {
    const words = description.split(" ");
    const truncatedDescription = words.slice(0, 10).join(" ");
    return truncatedDescription + (words.length > 10 ? "..." : "");
  };
 
  const handleDisable = () => {
    axios
      .post(
        `${baseUrl}/${status === 0 ? "enable" : "disable"}_course/${props.id}/`
      )
      .then((response) => {
        setStatus(1 - status); // Toggle the status
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  return (
    <div
      className={`card ${status === 0 ? "disabled-card" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={props.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title marginprop">{props.title}</h5>
        {!isHovered && (
          <p className="card-text description-hidden">
            {truncateDescription(props.desc)}
          </p>
        )}
        <Link
          to={`/Teacher/detail/${props.id}`}
          className="btn btn-primary btn-color knowMorebtn"
        >
          Know More &rarr;
        </Link>
 
        {isHovered && (
          <div className="popup" style={{ height: popupHeight }} ref={popupRef}>
            <p>{truncateDescription(props.desc)}</p>
          </div>
        )}
 
        <div className="center-bottom-container">
          <button
            className="bttn btn-primary btn-color disablebtn"
            onClick={handleDisable}
          >
            {status === 0 ? "Enable" : "Disable"}
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default Card;