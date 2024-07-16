import { useState } from "react"
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import HomeLayout from "../Layouts/HomeLayout"

function SignUp() {

        const dispatch = useDispatch();
        const navigator = useNavigate();

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
            event.preventDefault()

            const uploadImage = event.target.files[0]

            if(uploadImage){
                setPreviewImage({
                    ...PreviewImage,
                    avatar : uploadImage
                })
                const fileReader = new FileReader();
                fileReader.readAsDataURL(uploadImage);
                fileReader.addEventListener('load' , function() {
                    console.log(this.result);
                    setPreviewImage(this.result)
                } )
            }

        }

    const [PreviewImage , setPreviewImage] = useState("")

    return (
       

        <HomeLayout>

            <div className="flex overflow-x-auto items-center justify-center h-[100vh]">


                <form className=" flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0 ,0, 10px]">

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
                    accept=".jpg , .png , jpeg , .svg"
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

                     <button type="submit" className="bg-yellow-600 hover: bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm  mt-2 py-2 font-semibold text-lg cursor-pointer">
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