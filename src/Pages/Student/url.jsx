import React from "react";

function Url(props) {
  console.log('Video Link:', props.link);

  const playVideo = () => {
    window.open(props.link, '_blank');
  };

  return (
    <li className="list-group-item btn-flex">
      {props.title}
      <button className="" onClick={playVideo}>
        View
      </button>
    </li>
  );
}

export default Url;