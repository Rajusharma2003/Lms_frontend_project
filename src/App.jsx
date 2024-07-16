import './App.css'

import { Route, Routes } from 'react-router-dom'

import AboutUs from './Pages/AboutUsPage.jsx'
import Homepage from './Pages/HomePage.jsx'
import NotFound from './Pages/NotFoundPage.jsx'
import SignUp from './Pages/SignUpPage.jsx'



function App() {

  return (
    <>
     <Routes>

      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/about' element={<AboutUs/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
     </Routes>


    </>
  )
}

export default App
