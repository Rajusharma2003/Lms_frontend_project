import { useState } from "react"
import {toast} from "react-hot-toast"
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import HomeLayout from "../Layouts/HomeLayout"
import { createAccount } from "../Router/Slice/AuthSlice"

function SignUp() {

        const dispatch = useDispatch();
        const navigator = useNavigate();


    const [PreviewImage , setPreviewImage] = useState("")


        const [signupData , setSignUpData] = useState( {
            fullName : "",
            email : "",
            password : "",
            avatar : ""
        })

        function handleUserInput(e) {
            const {name , value} = e.target
            setSignUpData( {
                ...signupData , 
                [name] : value
            })
        } 

        function getImage(event) {
            event.preventDefault();

            const uploadImage = event.target.files[0]

            if(uploadImage){
                setSignUpData({
                    ...signupData,
                    avatar : uploadImage,
                })
                const fileReader = new FileReader();
                fileReader.readAsDataURL(uploadImage);
                fileReader.addEventListener('load' , function() {
                    // console.log(this.result);
                    setPreviewImage(this.result)
                } )
            }

        }


       async function createNewAccount(event) {
            event.preventDefault();

            if(!signupData.fullName || !signupData.email || !signupData.password ){
                toast.error("pls fill all the details")
                return;
            }   


            if(signupData.fullName.length < 5){
                toast.error("Name should be at least 5 character");
                return;
            }

            if(!signupData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                toast.error("invalid email");
                return;
            }

            if(!signupData.password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)) {
                toast.error("password should be atleast 6-16 number and spacial character ");
                return;
            }

            
            const formData = new FormData()
            formData.append("fullName" , signupData.fullName)
            formData.append("email" , signupData.email)
            formData.append("password" , signupData.password)
            formData.append("avatar" , signupData.avatar)

             
            // dispatch create account action.
            const response = await dispatch(createAccount(formData))
            //  console.log(response);
            if(response?.payload?.success)
            navigator("/")   // To the Home page 

            setSignUpData({
                fullName : "",
                email : "",
                password : "",
                avatar : ""
            })

            setPreviewImage("")
            
        }


    return (
       

        <HomeLayout>

            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">


                <form noValidate onSubmit={createNewAccount} className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">

                    <h1 className="text-center text-2xl font-bold">Registration Page</h1>

                    <label htmlFor="image_uploads" className="cursor-pointer">

                        {PreviewImage ? (
                             <img className="w-24 h-24 rounded-full m-auto" src={PreviewImage}/>
                             ) : (
                             <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                             )}
                    </label>

                    <input
                    type="file" 
                    className="hidden"
                    name="image_uploads"
                    id="image_uploads"
                    accept=".jpg , .png , .jpeg , .svg"
                    onChange={getImage}
                     />

                     {/* This is for Name */}
                        <div className="flex flex-col gap-1 ">

                        <label htmlFor="fullName" className="font-semibold">fullName</label>
                        <input 
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Enter Your Name"
                        className="bg-transparent px-2 py-1 border"
                        value={signupData.fullName}
                        onChange={handleUserInput}
                        />
                        </div>

                    {/* This is for email */}
                     <div className="flex flex-col gap-1 ">

                        <label htmlFor="email" className="font-semibold">email</label>
                        <input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="bg-transparent px-2 py-1 border"
                        value={signupData.email}
                        onChange={handleUserInput}
                         />
                     </div>
                    
                    {/* This is for password */}
                     <div className="flex flex-col gap-1 ">

                        <label htmlFor="password" className="font-semibold">password</label>
                        <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Your password"
                        className="bg-transparent px-2 py-1 border"
                        value={signupData.password}
                        onChange={handleUserInput}
                         />
                     </div>

                     <button type="submit" className=" bg-yellow-600 hover: bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  mt-2 py-2 font-semibold text-lg cursor-pointer">
                        Create Account 
                     </button>

                    <p className="text-center">
                        Already Have a Account ? <Link className="link text-accent cursor-pointer" to="/login">Login</Link>
                    </p>

                </form>
            </div>





        </HomeLayout>


    )
}

export default SignUp