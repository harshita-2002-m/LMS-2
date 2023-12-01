import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import '~mdb-ui-kit/css/mdb.min.css';
// import { Link } from 'react-router-dom';
import * as mdb from "mdb-ui-kit"; // lib
import { Input } from "mdb-ui-kit"; // module
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
const baseUrl = "https://danville.pythonanywhere.com/api";
 
export default function Profile() {
  const [studentData, setStudentData] = useState([]);
 
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
          } else {
            console.error("IDs do not match");
          }
        } else {
          console.error("No instructor ID in local storage");
        }
      } catch (error) {
        console.error("Error fetching instructor data:", error);
      }
    };
 
    fetchData();
  }, []);
 
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
                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a href="/Student/EditProfile">Edit Profile</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a href="/Student/ResetPassword">Reset Password</a>
                </MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
 
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={student.profilePicture}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "150px" }}
                    fluid
                  />
                  {/* <p className="text-muted mb-1">Full Stack Developer</p>
                <p className="text-muted mb-4">Guwahati, Assam, India</p> */}
                  <div className="d-flex justify-content-center mb-2">
                    {/* <MDBBtn>Follow</MDBBtn>
                  <MDBBtn outline className="ms-1">Message</MDBBtn> */}
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard
                className="mb-4 UserProfileContainer"
                style={{ width: "100%" }}
              >
                <MDBCardBody style={{ width: "100vw" }}>
                  <MDBRow style={{ width: "" }}>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {student.firstName}
                        {student.lastName}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ width: "100vw" }}>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {student.email}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ width: "100vw" }}>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {student.contactNumber}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ width: "100vw" }}>
                    <MDBCol sm="3">
                      <MDBCardText>Date Of Birth</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {student.dob}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow style={{ width: "100vw" }}>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {student.address}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ))}
    </section>
  );
}
