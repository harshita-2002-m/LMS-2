import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const baseUrl = "https://danville.pythonanywhere.com/api";

function ChangePassword() {
  const navigate = useNavigate();
  const { user_type, user_id } = useParams();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  // const submitForm = () => {
  //     const formData = new FormData();
  //     formData.append("password", password);

  //     axios.post(baseUrl + `/change-password/${user_type}/${user_id}/`, formData)
  //         .then((res) => {
  //             if (res.data.user_type) {
  //                 setSuccessMsg('Password has been changed successfully');
  //                 navigate("/Login");
  //             } else {
  //                 setErrorMsg('Some error occurred while changing password');
  //             }
  //         })
  //         .catch((error) => {
  //             console.log(error);
  //         });
  // };

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("password", password);

    try {
      const response = await axios.post(
        baseUrl + `/change-password/${user_type}/${user_id}/`,
        formData
      );

      if (response.data.user_type) {
        setSuccessMsg("Password has been changed successfully");
      } else {
        setErrorMsg("Some error occurred while changing password");
      }

      // Wait for a few seconds before navigating
      setTimeout(() => {
        navigate("/Login");
      }, 2000); // Navigate after 3 seconds (adjust as needed)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card-body col-5 offset-5">
      <div className="login-container">
        {successMsg && <p className="text-success">{successMsg}</p>}
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">Enter new password</label>
            <input
              type="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword"
              placeholder="Enter password"
            />
          </div>
          <div className="form-group">
            <button
              type="button"
              value="submit"
              onClick={submitForm}
              // className="btn btn-primary"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
