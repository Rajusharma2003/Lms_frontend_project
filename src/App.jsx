import './App.css';

import { Route, Routes } from 'react-router-dom';

import RequireAuth from './Components/Auth/RequireAuth';
import AboutUs from './Pages/AboutUs';
import ContactPage from './Pages/ContactUs';
import CourseDescription from './Pages/Courses/CourseDescription';
import CourseList from './Pages/Courses/CoursePage';
import CreateCourse from './Pages/Courses/CreateCourse';
import AddLecture from './Pages/Dashboard/AddLecture';
import AdminDashboard from './Pages/Dashboard/AdminDashboard';
import Displaylecture from './Pages/Dashboard/Displaylecture';
import Denied from './Pages/Denied';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound';
import CheckoutPage from './Pages/Payments/Checkout';
import CheckoutFail from './Pages/Payments/CheckoutFail';
import CheckoutSuccess from './Pages/Payments/CheckoutSuccess';
import Signup from './Pages/Signup';
import EditProfile from './Pages/User/Editprofile';
import GetProfile from './Pages/User/Profile';


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
        <Route path="/course/addlecture" element={<AddLecture/>} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>} />
        </Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]}/>} >
        <Route path="/user/profile" element={<GetProfile/>} />
        <Route path="/user/editprofile" element={<EditProfile/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
        <Route path="/checkout/success" element={<CheckoutSuccess/>} />
        <Route path="/checkout/fail" element={<CheckoutFail/>} />
        <Route path="/course/displaylecture" element={<Displaylecture/>} />
        </Route>

        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  )
}

export default App
