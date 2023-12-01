import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const baseUrl = "https://danville.pythonanywhere.com/api";
 
function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
 
  const studentId = localStorage.getItem("studentId");
 
  const handleChange = (event) => {
    // Clear the error message when the user starts typing a new password
    setErrorMsg("");
    setPassword(event.target.value);
  };
 
  const submitForm = async () => {
    if (!password.trim()) {
      setErrorMsg("New password is required");
      return;
    }
 
    // Define the password regex pattern
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
 
    if (!passwordRegex.test(password)) {
      setErrorMsg(
        "Password must be at least 8 characters long and contain a mix of uppercase letters, lowercase letters, and numbers, and atleast one special character((?=.*[!@#$%^&*()_+{}[]:;<>,.?~\\/-]))"
      );
      return;
    }
 
    const formData = new FormData();
    formData.append("password", password);
 
    try {
      const response = await axios.post(
        baseUrl + `/student-reset-password/${studentId}/`,
        formData
      );
 
      if (response.data.user_type) {
        setSuccessMsg("Password has been reset successfully");
      } else {
        setErrorMsg("Some error occurred while changing password");
      }
 
      // Wait for a few seconds before navigating
      setTimeout(() => {
        navigate("/");
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
            <button type="button" value="submit" onClick={submitForm}>
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default ResetPassword;
