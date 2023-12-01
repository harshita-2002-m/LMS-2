// import './EditProfile.css';
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
const baseUrl = "https://danville.pythonanywhere.com/api";
export default function EditProfile() {
  const [studentData, setStudentData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
    dob: "",
    address: "",
  });
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedStudentId = JSON.parse(localStorage.getItem("studentId"));
        console.log(storedStudentId);
 
        if (storedStudentId) {
          // Fetch data from API using the ID from local storage
          const response = await axios.get(
            `${baseUrl}/student/${storedStudentId}/`
          );
 
          // Check if the fetched ID matches the one from local storage
          if (response.data.id == storedStudentId) {
            setStudentData([response.data]);
            setFormData({
              firstName: response.data.firstName,
              lastName: response.data.lastName,
              email: response.data.email,
              contactNumber: response.data.contactNumber,
              profilePicture: response.data.profilePicture,
              dob: response.data.dob,
              address: response.data.address,
            });
          } else {
            console.error("IDs do not match");
          }
        } else {
          console.error("No student ID in local storage");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
 
    fetchData();
  }, []);
 
  const handleInputChange = (e) => {
    if (e.target.id == "profilePicture") {
      // Handle file input separately
      setFormData({
        ...formData,
        profilePicture: e.target.files[0], // Use the first file if multiple files are selected
      });
    } else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
 
  const handleSaveChanges = async () => {
    try {
      const storedStudentId = JSON.parse(localStorage.getItem("studentId"));
      if (storedStudentId) {
        const form = new FormData();
        form.append("firstName", formData.firstName);
        form.append("lastName", formData.lastName);
        form.append("email", formData.email);
        form.append("contactNumber", formData.contactNumber);
        form.append("dob", formData.dob);
        form.append("address", formData.address);
 
        // Conditionally append profile picture only if it exists
        if (formData.profilePicture instanceof File) {
          form.append("profilePicture", formData.profilePicture);
        }
 
        const res = await axios.put(
          `${baseUrl}/student/${storedStudentId}/`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to handle file upload
            },
          }
        );
 
        setFormData({
          ...formData,
          profilePicture: res.data.profilePicture,
        });
 
        console.log("Student data updated successfully");
      } else {
        console.error("No student ID in local storage");
      }
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };
 
  return (
    <section style={{ backgroundColor: "#eee" }}>
      {studentData.map((student) => (
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                {/* <MDBBreadcrumbItem>
                <a href='/Home'>Home</a>
              </MDBBreadcrumbItem> */}
                <MDBBreadcrumbItem>
                  <a href="/Student/Profile">User Profile</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Edit Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
 
          <MDBRow>
            <MDBCol lg="3">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={formData.profilePicture}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
 
                  <div className="d-flex justify-content-center mb-2"></div>
                  <div class="media-body ml-4">
                    <label class="form-label" for="customFile">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      onChange={handleInputChange}
                      class="form-control"
                    />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
 
            <MDBCol lg="8">
              <MDBCard className="mb-4" style={{ width: "100%" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>First Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="text"
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          class="form-control"
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Last Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="email"
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          class="form-control"
                          placeholder="Enter your lastname"
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          class="form-control"
                          placeholder="Enter your email address"
                          disabled
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
 
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="tel"
                          id="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          class="form-control"
                          placeholder="Enter your phone number"
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Date Of Birth</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="text"
                          id="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          class="form-control"
                          placeholder="Enter the date"
                          disabled
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        <input
                          type="text"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          class="form-control"
                          placeholder="Enter your address"
                        />
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
 
              <MDBRow>
                <MDBRow>
                  <MDBCol>
                    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4 savechangediv">
                      <MDBBreadcrumbItem>
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={handleSaveChanges}
                        >
                          Save Changes
                        </button>
                      </MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </MDBCol>
                </MDBRow>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ))}
    </section>
  );
}
