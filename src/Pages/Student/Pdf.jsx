import React from "react";
 
function Pdf({ link, title, id }) {
  const openPdf = () => {
    window.open(link, "_blank");
  };
 
  return (
    <li className="list-group-item btn-flex">
      {title}
      <button className="text-white" href={link} target="_blank" rel="noopener noreferrer" onClick={openPdf}>
        View
     
      </button>
    </li>
  );
}
 
export default Pdf;
