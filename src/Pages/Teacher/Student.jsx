import React from "react";
 
function Student(props) {
  return (
    <li className="list-group-item">
      {props.name}
      <button className="btn btn-sm float-end bgcolor" onClick={props.onRemove}>
        Remove
      </button>
    </li>
  );
}
 
export default Student;