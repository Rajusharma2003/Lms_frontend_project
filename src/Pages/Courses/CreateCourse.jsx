import { useState } from "react";
import {toast}  from 'react-hot-toast'
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from '../../Layouts/HomeLayout'
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput , setUserInput] = useState({
        title : "",
        category : "",
        description :"",
        thumbnail : null,
        previewImage : ""
    });

    // This funtion is handle image section.
    function handleImageUpload(e) {
        e.preventDefault()
        const uploadedImage = e.target.files[0];

        if(uploadedImage){
            const fileReader = new FileReader()
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load" , function() {
                setUserInput({
                    ...userInput,
                    previewImage : this.result,
                    thumbnail : uploadedImage
                })
            })
        }
    }


    // This funtion is handle input section.
    function handleUserInput(e) {
        const {name , value} = e.target
        setUserInput({
            ...userInput,
            [name] : value
        })
    }


 // This funtion is handle the formSubmit.
  async function onFormSubmit(e) {
        e.preventDefault()

        if(!userInput.category || !userInput.description || !userInput.title ){
            toast.error("All field are mandatory");
            return
        }

        const response = await dispatch(createNewCourse(userInput))
        if(response?.payload?.success){
            setUserInput({
                title : "",
                category : "",
                description :"",
                thumbnail : null,
                previewImage : ""
            });
        navigate("/courses")
        }
    }


    return (
        <HomeLayout>
            
            <div className="flex justify-center items-center h-[100vh]">
                <form 
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg text-white p-4 w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >
                    <Link className="absolute top-8 text-2xl link text-accent cursor-pointer">
                    <AiOutlineArrowLeft/>
                    </Link>

                    <h1 className="text-center text-2xl font-bold ">
                        Create new course
                    </h1>

                <main className="grid grid-cols-2 gap-x-10">
                    <div className="gap-y-6">
                        <div>
                        <label htmlFor="image_uploads" className=" cursor-pointer">
                            {userInput.previewImage ?(
                                <img 
                                className="w-full h-44 m-auto border"
                                src={userInput.previewImage}
                                alt="previewImage" />
                            ) : (
                                <div className=" w-full m-auto h-44 flex justify-center items-center border">
                                    <h1 className=" font-bold text-lg"> Upload your course thumbnail </h1>
                                </div>
                            )}
                        </label>
                        <input 
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".png , .jpg , .jpeg"
                        onChange={handleImageUpload}
                        />
                 </div>
                    
                    <div className=" flex flex-col gap-1">
                        <label htmlFor="title" className="text-lg font-semibold">
                            Course Title
                        </label>
                        <input
                        type="text"
                        required
                        name="title"
                        id="title"
                        placeholder="Enter course title"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.title}
                        onChange={handleUserInput}
                        />
                    </div> 
              </div> 

              <div className=" flex flex-col gap-1">
                   <div className=" flex flex-col gap-1">
                        <label htmlFor="createdBy" className="text-lg font-semibold">
                            Course Instructor
                        </label>
                        <input
                        type="text"
                        required
                        name="createdBy"
                        id="createdBy"
                        placeholder="Enter course Instructor"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.createdBy}
                        onChange={handleUserInput}
                        />
                    </div> 


                    <div className=" flex flex-col gap-1">
                        <label htmlFor="category" className="text-lg font-semibold">
                            Course category
                        </label>
                        <input
                        type="text"
                        required
                        name="category"
                        id="category"
                        placeholder="Enter course category"
                        className="bg-transparent px-2 py-1 border"
                        value={userInput.category}
                        onChange={handleUserInput}
                        />
                    </div> 


                    <div className=" flex flex-col gap-1">
                        <label htmlFor="description" className="text-lg font-semibold">
                            Course description
                        </label>
                        <textarea
                        type="text"
                        required
                        name="description"
                        id="description"
                        placeholder="Enter course description"
                        className="bg-transparent px-2 py-1 h-24 overflow-y-scroll resize-none border"
                        value={userInput.description}
                        onChange={handleUserInput}
                        />
                    </div> 
              </div>


         </main>

                <button type="submit" className=" w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                    Create Course
                </button>
                
            </form>
        </div>
          
        </HomeLayout>
        
    )
}


export default CreateCourse