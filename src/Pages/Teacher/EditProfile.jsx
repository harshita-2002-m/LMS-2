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
  const [instructorData, setInstructorData] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
    dob: "",
    address: "",
  });
 
  const [enrollmentAdded, setEnrollmentAdded] = useState(false);
  const [error, setError] = useState(null); // State variable for error message
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedInstructorId = JSON.parse(
          localStorage.getItem("instructorId")
        );
        console.log(storedInstructorId);
 
        if (storedInstructorId && !enrollmentAdded) {
          const response = await axios.get(
            `${baseUrl}/instructor/${storedInstructorId}/`
          );
 
          if (response.data.id === storedInstructorId) {
            setInstructorData([response.data]);
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
          console.error(
            "No instructor ID in local storage or enrollment data added"
          );
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };
 
    fetchData();
  }, [enrollmentAdded]);
 
  const handleInputChange = (e) => {
    if (e.target.id === "profilePicture") {
      setFormData({
        ...formData,
        profilePicture: e.target.files[0],
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
      const storedInstructorId = JSON.parse(
        localStorage.getItem("instructorId")
      );
      if (storedInstructorId) {
        const form = new FormData();
        form.append("firstName", formData.firstName);
        form.append("lastName", formData.lastName);
        form.append("email", formData.email);
        form.append("contactNumber", formData.contactNumber);
        form.append("dob", formData.dob);
        form.append("address", formData.address);
 
        if (formData.profilePicture instanceof File) {
          form.append("profilePicture", formData.profilePicture);
        }
 
        const res = await axios.put(
          `${baseUrl}/instructor/${storedInstructorId}/`,
          form,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
 
        setFormData({
          ...formData,
          profilePicture: res.data.profilePicture,
        });
 
        console.log("Instructor data updated successfully");
 
        // Check if the same student ID is present in the enrollment table
        if (res.data.error) {
          setError(res.data.error);
        } else {
          setError(null);
          setEnrollmentAdded(true);
        }
      } else {
        console.error("No instructor ID in local storage");
      }
    } catch (error) {
      console.error("Error updating instructor data:", error);
    }
  };
 
  return (
    <section style={{ backgroundColor: "#eee" }}>
      {instructorData.map((instructor) => (
        <MDBContainer className="py-5" key={instructor.id}>
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                {/* <MDBBreadcrumbItem>
                <a href='/Home'>Home</a>
              </MDBBreadcrumbItem> */}
                <MDBBreadcrumbItem>
                  <a href="/Teacher/Profile">User Profile</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>Edit Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
 
          <MDBRow>
            <MDBCol lg="3" className="editprofileDiv">
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
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </MDBContainer>
      ))}
    </section>
  );
}
