import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";



function AddLecture() {

    const courseDetails = useLocation().state
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [userInput , setUserInput] = useState( {
        id : courseDetails._id,  
        lecture : undefined,
        title : '',
        description : '',
        videoSrc : '',
    })

    function handleInput(e) {
        const {name , value} = e.target
        setUserInput( {
            ...userInput,
            [name] : value
        })
    }



    function handleUploadVideo(e) {
        const video = e.target.files[0];
        if (video) {
            const source = window.URL.createObjectURL(video);
            console.log(  "this issource",source);
    
            setUserInput({
                ...userInput, // Ensure other fields remain intact
                lecture: video,
                videoSrc: source,
            });
        }
    }

    
async function onFormSubmit(e) {
    e.preventDefault();
    // console.log(userInput); // Add this line for debugging

    if (!userInput.lecture || !userInput.title || !userInput.description) {
        toast.error("All fields are mandatory");
        return;
    }

    const response = await dispatch(addCourseLecture(userInput));
    if (response?.payload?.success) {
        navigate(-1);
        setUserInput({
            id: courseDetails._id,
            lecture: undefined,
            title: '',
            description: '',
            videoSrc: '',
        });
    }
}


    useEffect( () =>{
     if(!courseDetails) navigate('/courses')
    },[])

    return (
        <HomeLayout>
            <div className="flex items-center justify-center min-h-screen text-white">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button 
                            className="absolute left-2 text-xl text-green-500" 
                            onClick={() => navigate(-1)}
                        >
                            <AiOutlineArrowLeft />
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold">
                            Add New Lecture
                        </h1>
                    </header>
    
                    <form 
                        onSubmit={onFormSubmit}
                        className="flex flex-col gap-3"
                    >
                        <input 
                            type="text"
                            name="title"
                            placeholder="Enter the title of the lecture"
                            onChange={handleInput}
                            value={userInput.title}
                            className="bg-transparent px-3 py-1 border"
                        />
    
                        <textarea
                            
                            name="description"
                            placeholder="Enter the description of the lecture"
                            onChange={handleInput}
                            value={userInput.description}
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                        />
    
                        {userInput?.videoSrc ? (
                            <video
                                muted
                                src={userInput.videoSrc}
                                controls
                                controlsList="nodownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                            />
                        ) : (
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label htmlFor="lecture" className="font-semibold text-xl cursor-pointer">Choose Your Video</label>
                                <input
                                    type="file"
                                    className="hidden"
                                    id="lecture"
                                    name="lecture"
                                    onChange={handleUploadVideo}
                                    accept="video/mp4, video/x-m4v, video/*"
                                />
                            </div>
                        )}
    
                        <button className="btn btn-primary py-1 font-semibold text-lg" type="submit">
                            Add New Lecture
                        </button>
                    </form>
                </div>
            </div>
        </HomeLayout>
    );
    
}


export default AddLecture