// import { Link } from "react-router-dom";

// function Card(props) {
//   return (
//     <div className="card">
//       <img src={props.img} className="card-img-top" alt="..." />
//       <div className="card-body">
//         <h5 className="card-title">{props.title}</h5>
//         <p className="card-text">{props.desc}</p>
//         <Link to={`/Teacher/detail/${props.id}`} className="btn btn-primary btn-color knowMorebtn">
//           Know More &rarr;
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Card;
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupHeight, setPopupHeight] = useState("auto");
  const popupRef = useRef(null);

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

  // Function to limit the description to the first 15 words
  const truncateDescription = (description) => {
    const words = description.split(' ');
    const truncatedDescription = words.slice(0, 10).join(' ');
    return truncatedDescription + (words.length > 10 ? '...' : '');
  };

  return (
    <div
      className="card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={props.img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title marginprop">{props.title}</h5>
        {/* Show description only when not hovered */}
        {!isHovered && (
          <p className="card-text description-hidden">{truncateDescription(props.desc)}</p>
        )}
        <Link to={`/Teacher/detail/${props.id}`} className="btn btn-primary btn-color knowMorebtn">
          Know More &rarr;
        </Link>

        {isHovered && (
          <div
            className="popup"
            style={{ height: popupHeight }}
            ref={popupRef}
          >
            <p>{truncateDescription(props.desc)}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
