import { useState } from "react"
import toast from "react-hot-toast"
import {  AiOutlineArrowLeft } from "react-icons/ai"
import { BsPersonCircle } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layouts/HomeLayout"
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice"

function EditProfile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data , setData] = useState({
        previewImage : '',
        fullName : '',
        avatar : undefined,
        userId : useSelector((state) => state?.auth?.data?._id)

    })


    // this is from input section.
    function handleInput(e){
        const {name , value} = e.target
        setData({
            ...data,
            [name] : value
        })
    }

    // this is upload image section.
    function handleUploadImage(e) {
        e.preventDefault();

        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener('load' , function(){
                setData({
                    ...data,
                    previewImage : this.result,
                    avatar : uploadedImage
                })
            })
        }
    }


   async function onFormSubmit(e){
        e.preventDefault()

        if(!data.fullName){
            toast.error('All fields are manditory')
        }

        if(data.fullName < 5){
            toast.error('fullName should be at least more than 5 character')
        }

        const formData = new FormData()
        formData.append("fullName" , data.fullName)
        formData.append("avatar" , data.avatar)

        await dispatch(updateProfile([data.userId , formData]))
        await dispatch(getUserData())

        navigate('/user/profile')

    }
    

    return(

        <HomeLayout>

            <div className=" flex items-center justify-center h-[100vh]">

                <form 
                     noValidate
                     onSubmit={onFormSubmit}
                     className=" flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className=" text-center text-2xl font-semibold">Edit Profile</h1>

                    <label htmlFor="image_upload" className="cursor-pointer">
                        {data?.previewImage ? (
                            <img
                            src={data?.previewImage}
                            className="w-28 h-28 rounded-full m-auto" 
                            />
                        ): (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto"/>
                        )
                    }
                    </label>

                        <input
                        className="hidden"
                        type="file" 
                        onChange={handleUploadImage}
                        id="image_upload" 
                        name="image_upload"
                        accept=".jpg , .png , .svg , .jpeg"
                        />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="fullName" className="text-lg font-semibold">Full Name</label>
                                <input 
                                    required
                                    type="text" 
                                    name="fullName" 
                                    id="fullName"
                                    placeholder="Enter your fullName"
                                    className="bg-transparent px-2 py-1 border"
                                    value={data?.fullName}
                                    onChange={handleInput}

                                />
                        </div>

                        <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer">
                            Update Profile
                        </button>

                        <Link to="/user/profile">
                            <p className="text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                               <AiOutlineArrowLeft/> Go Back to Profile
                            </p>
                        </Link>

                </form>
            </div>

        </HomeLayout>

    )
}

export default EditProfile