import { useState } from "react";
import axios from "axios";
import React from "react";
//import {Link} from 'react-router-dom';
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function ForgotPassword() {
  // const navigate=useNavigate();
  const [email, setEmail] = useState({
    email: "",
  });
 
  const [errorMsg, seterrorMsg] = useState("");
  const [successMsg, setsuccessMsg] = useState("");
 
  const handleChange = (event) => {
    setEmail({
      ...email,
      [event.target.name]: event.target.value,
    });
  };
 
  const submitForm = () => {
    setsuccessMsg("");
    seterrorMsg("");
 
    const formData = new FormData();
    formData.append("email", email.email);
 
    //axios.post(baseUrl+'/login/', formData)
    axios
      .post(baseUrl + "/forget-password/", formData)
      .then((res) => {
        if (res.data.user_type === "instructor") {
          setsuccessMsg("success");
        } else if (res.data.user_type === "student") {
          setsuccessMsg("success");
        } else {
          seterrorMsg("Invalid Email!!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
 
  return (
    // Your login form JSX remains the same
    <div className=" card-body col-5 offset-5">
      <div className="login-container">
        {successMsg && <p className="text-success">{successMsg}</p>}
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">
              Enter Your Registered Email
            </label>
            <input
              type="email"
              value={email.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
 
          <div className="form-group">
            <button
              type="button"
              value="submit"
              onClick={submitForm}
              // className="btn-flex btn btn-primary"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default ForgotPassword;
