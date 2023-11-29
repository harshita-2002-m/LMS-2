// import Login from './Login';

// function App() {
//   return (
//     <div className='App'>
//       <Login/>
//     </div>
//   );
// }
// export default App;
import Login from './Login';
import { Routes, Route } from "react-router-dom"
import StudentApp from '../Pages/Student/StudentApp'
import TeacherApp from '../Pages/Teacher/TeacherApp'
import ForgotPassword from "./ForgotPassword"
import ChangePassword from "./ChangePassword"
function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Teacher/*" element={< TeacherApp />} />
        <Route path="/Student/*" element={< StudentApp />} />
        <Route path="/forgot-password/*" element={< ForgotPassword />} />

        <Route path="/change-password/:user_type/:user_id" element={< ChangePassword />} />
      </Routes>

    </div>
  );
}
export default App;

