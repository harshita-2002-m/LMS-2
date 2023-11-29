

function AllStudents(){
    return(
        <div>
              <div className="card courseContent-container" >
                <div className="card-header class-header-style text-white">
                 ENROLLED STUDENTS
                 <button className="btn btn-sm float-end bg-white">Message All</button>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Student 1 <button className="btn btn-sm float-end bgcolor">Message</button></li>
                  <li className="list-group-item">Student 2 <button className="btn btn-sm float-end bgcolor">Message</button></li>
                  <li className="list-group-item">Student 3 <button className="btn btn-sm float-end bgcolor">Message</button></li>
                  <li className="list-group-item">Student 4 <button className="btn btn-sm float-end bgcolor">Message</button></li>
                  <li className="list-group-item">Student 5 <button className="btn btn-sm float-end bgcolor">Message</button></li>
                  {/* <li className="list-group-item">Video 6 <button className="btn btn-sm float-end">play</button></li> */}
                </ul>
              </div>
        </div>
        
       );
}
export default AllStudents;