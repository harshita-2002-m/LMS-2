import React, { useState } from "react";

import '../App.css'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const baseUrl = "https://danville.pythonanywhere.com/api";

function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "", login: "" });

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });

    // Clear validation errors when the user starts typing
    setErrors({ email: "", password: "", login: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Basic email validation
    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Basic password validation
    if (!loginData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitForm = () => {
    if (validateForm()) {
      const formData = new FormData();
      formData.append("email", loginData.email);
      formData.append("password", loginData.password);

      axios
        .post(baseUrl + "/login", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.user_type === "instructor") {
            localStorage.setItem("userType", "instructor");
            localStorage.setItem("instructorId", res.data.id);
            console.log("Instructor ID:", res.data.id); // Log the instructor ID
            navigate("/Teacher");
          } else if (res.data.user_type === "student") {
            localStorage.setItem("userType", "student");
            localStorage.setItem("studentId", res.data.student_id);
            navigate("/Student");
          } else {
            // Handle invalid login
            setErrors({ login: "Incorrect email or password" });
          }
        })
        .catch((error) => {
          console.log(error);
          // Handle API error
          setErrors({ login: "Login failed. Please try again." });
        });
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <form>
          <h1 className="login-title">Login</h1>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              value={loginData.email}
              name="email"
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <span className="error-message">{errors.email}</span>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={loginData.password}
              name="password"
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
            <span className="error-message">{errors.password}</span>
          </div>
          <span className="error-message">{errors.login}</span>
          <button
            type="button"
            value="submit"
            onClick={submitForm}
            className="btn-flex btn btn-primary loginbtn"
          >
            Login
          </button>
          <p>
            <Link to="/forgot-password" className="text-danger">
              Forgot Password?
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
