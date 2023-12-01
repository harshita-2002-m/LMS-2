function Quiz(props) {
    return (
      <li className="list-group-item">
        <a href={props.link} target="_blank" rel="noreferrer">
          {props.title}
        </a>
 
        {/* <button
          className="DeleteVideo btn btn-sm float-end text-white"
          onClick={props.onDelete}
        >
          Delete
        </button> */}
        {/* <button className="">
          <a className="text-white" href="https://forms.office.com/" target="_blank" rel="noreferrer">
            Go
          </a>
        </button> */}
        {/* <button className="btn btn-sm float-end text-white">
          <a className="text-white" href="" target="_blank" >
            Enable
          </a>
        </button> */}
      </li>
    );
  }
  export default Quiz;
