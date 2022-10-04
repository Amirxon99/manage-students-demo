import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Courses from "./pages/course/Courses";
import CourseAddandEdit from "./pages/course/CourseAddandEdit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Students from "./pages/students/Students";
import AddEditStudents from "./pages/students/StudentAddandEdit";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Verify from "./pages/auth/verify";
import Users from "./pages/users/User";
import AddEditUsers from "./pages/users/UserAddandEdit";
import { useEffect, useState } from "react";
import VerifyByPhone from "./pages/auth/verifyByPhone";

function App() {
  const navigate = useNavigate();
  const userrole = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, userrole]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {<Route path="/" element={<Home />} />}
        <Route path="/courses" element={<Courses />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<AddEditStudents />} />
        {userrole === "SUPER_ADMIN" && (
          <Route path="/users/" element={<Users />} />
        )}
        {userrole === "SUPER_ADMIN" && (
          <Route path="/users/:id" element={<AddEditUsers />} />
        )}
        {/* <Route path="/users/:id" element={<AddEditUsers />} /> */}
        <Route path="/courses/:id/students" element={<Students />} />
        <Route path="/courses/:id" element={<CourseAddandEdit />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/verifyByPhone/:id" element={<VerifyByPhone />} />
      </Routes>
    </>
  );
}

export default App;




// import { Route, Routes, useNavigate } from "react-router-dom";
// import AddEditCourse from "./pages/AddEditCourse";
// import AddEditStudents from "./pages/AddEditStudents";
// import AddEditUsers from "./pages/AddEditUser";
// import Courses from "./pages/Courses";
// import Students from "./pages/Students";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home";
// import Auth from "./pages/Auth";
// import Login from "./pages/Login";
// import {useEffect, useState} from "react"
// import { UserContext } from "./context/UserContext";
// import Verify from "./pages/Verify";
// import Users from "./pages/Users";

// function App() {
//   const [user,setUser]=useState(null)
//   const navigate=useNavigate()
// const userrole = localStorage.getItem("userrole");
// const token = localStorage.getItem("token");
// useEffect(() => {

//   if(!token){
//      navigate("/login")
//   }
// },[token,userrole])

//   return (
//     <>
//     <UserContext.Provider value={user}>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<Home/>}/>
//         <Route path="/register"element={<Auth setUser={setUser} />}/>
//         <Route path="/login"element={<Login setUser={setUser} />}/>
//         <Route path="/students" element={<Students/>}/>
//         <Route path="/courses" element={<Courses/>}/>
//         <Route path="/courses/:id" element={<AddEditCourse/>}/>
//         <Route path="/students/:id" element={<AddEditStudents/>}/>
//         <Route path="/users/:id" element={<AddEditUsers/>}/>
//         <Route path="/verify/:id" element={<Verify/>}/>
//         {userrole==="SuperAdmin"&&<Route path="/users" element={<Users/>}/>}
//       </Routes>
//        </UserContext.Provider>
//     </>
//   );
// }

// export default App;
