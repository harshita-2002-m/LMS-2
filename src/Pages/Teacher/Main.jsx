// import React from "react";
// import { Routes as Switch, Route } from "react-router-dom";
// import {useNavigate} from 'react-router-dom';
// import Home from "./Home";
// import Header from "./Header";
// import Profile from "./Profile";
// import EditProfile from "./EditProfile";
// import CourseDashboard from "./CourseDashboard";
// import Course from "./Course";
// import NewCourse from "./NewCourse";
// import AddStudents from "./AddStudents";
// import EnrolledStudents from "./EnrolledStudents";
// import ChatPage from "./ChatPage";
// import QuizDashboard from "./QuizDashboard";
// import NewQuiz from "./NewQuiz";
// import AddVideo from "./AddVideo";
// import AddTopic from "./AddTopic";
// import Footer from "./Footer";
// import AddPDF from "./AddPDF";
// import AddUrls from "./AddUrls";
// import Video from "./Video";
// import ResetPassword from "./ResetPassword 1";
// import OngoingCourse from "../Teacher/OngoingCourse";
// import CompletedCourse from "../Teacher/CompletedCourse";
// import Quizes from "./Quizes";
// import Faq from "./Faq";
// function Main() {
//   return (
//     <div className="App">
//       <Header />
//       <Switch>
 
//         <Route path="/" element={<Home />} />
//         <Route path="/CourseDashboard" element={<CourseDashboard />} />
//         <Route path="/NewCourse" element={<NewCourse />} />
 
//         <Route path="/detail/:id" element={<Course />} />
//         <Route path="/AddStudents/:id" element={<AddStudents />} />
//         <Route path="/EnrolledStudents/:id" element={<EnrolledStudents />} />
//         <Route path="/Profile" element={<Profile />} />
//         <Route path="/EditProfile" element={<EditProfile />} />
//         <Route path="/ChatPage" element={<ChatPage />} />
//         <Route path="/QuizDashboard" element={<QuizDashboard />} />
//         <Route path="/Quizes" element={<Quizes />} />
//         <Route path="/NewQuiz" element={<NewQuiz />} />
//         <Route path="/video/:link" element={<Video />} />
//         <Route path="/AddTopic" element={<AddTopic />} />
//         <Route path="/ResetPassword" element={<ResetPassword />} />
//         <Route path="/AddPDF/:id" element={<AddPDF />} />
//         <Route path="/AddUrls/:id" element={<AddUrls/>} />
//         <Route path="/AddVideo/:id" element={<AddVideo />} />
//         <Route path="/updateVideo/:id" element={<updateVideo />} />
//         <Route path="/faq" element={<Faq />} />
//         <Route path="/OngoingCourse" element={<OngoingCourse />} />
//         <Route path="/CompletedCourse" element={<CompletedCourse />} />
//         <Route path="/QuizDashboard/:id" element={<QuizDashboard />} />
//         <Route path="/Quizes/:id" element={<Quizes />} />
//         <Route path="/NewQuiz/:id" element={<NewQuiz />} />
 
//       </Switch>
//       <Footer />
//     </div>
//   );
// }
 
// export default Main;
 
//---------------------------------
 
import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
//import {useNavigate} from 'react-router-dom';
import Home from "./Home";
import Header from "./Header";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import CourseDashboard from "./CourseDashboard";
import Course from "./Course";
import NewCourse from "./NewCourse";
import AddStudents from "./AddStudents";
import EnrolledStudents from "./EnrolledStudents";
import ChatPage from "./ChatPage";
import QuizDashboard from "./QuizDashboard";
import NewQuiz from "./NewQuiz";
import AddVideo from "./AddVideo";
import AddTopic from "./AddTopic";
import Footer from "./Footer";
import AddPDF from "./AddPDF";
import AddUrls from "./AddUrls";
import Video from "./Video";
import ResetPassword from "./ResetPassword 1";
import OngoingCourse from "../Teacher/OngoingCourse";
import CompletedCourse from "../Teacher/CompletedCourse";
import Quizes from "./Quizes";
import Faq from "./Faq";
import AddSyllabus from "./AddSyllabus";
function Main() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/CourseDashboard" element={<CourseDashboard />} />
        <Route path="/NewCourse" element={<NewCourse />} />
 
        <Route path="/detail/:id" element={<Course />} />
        <Route path="/AddStudents/:id" element={<AddStudents />} />
        <Route path="/EnrolledStudents/:id" element={<EnrolledStudents />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ChatPage" element={<ChatPage />} />
        <Route path="/QuizDashboard" element={<QuizDashboard />} />
        <Route path="/Quizes" element={<Quizes />} />
        <Route path="/NewQuiz" element={<NewQuiz />} />
        <Route path="/video/:link" element={<Video />} />
        <Route path="/AddTopic" element={<AddTopic />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/AddPDF/:id" element={<AddPDF />} />
        <Route path="/AddUrls/:id" element={<AddUrls />} />
        <Route path="/AddVideo/:id" element={<AddVideo />} />
        <Route path="/updateVideo/:id" element={<updateVideo />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/OngoingCourse" element={<OngoingCourse />} />
        <Route path="/CompletedCourse" element={<CompletedCourse />} />
        <Route path="/QuizDashboard/:id" element={<QuizDashboard />} />
        <Route path="/Quizes/:id" element={<Quizes />} />
        <Route path="/NewQuiz/:id" element={<NewQuiz />} />
        <Route path="/AddSyllabus/:id" element={<AddSyllabus />} />
      </Switch>
      <Footer />
    </div>
  );
}
 
export default Main;
