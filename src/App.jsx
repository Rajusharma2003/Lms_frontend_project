import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs';
import ContactPage from './Pages/ContactUs';
import CourseDescription from './Pages/Courses/CourseDescription';
import CourseList from './Pages/Courses/CoursePage';
import CreateCourse from './Pages/Courses/CreateCourse';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import Signup from './Pages/Signup';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} ></Route>
        <Route path="/about" element={<AboutUs />} ></Route>
        <Route path="/contact" element={<ContactPage />} ></Route>
        <Route path="/courses" element={<CourseList/>} ></Route>
        <Route path="/course/description" element={<CourseDescription/>} ></Route>
        <Route path="/denied" element={<Denied/>} ></Route>

        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        {/* checked auth role */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>} >
        <Route path="/course/create" element={<CreateCourse/>} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
