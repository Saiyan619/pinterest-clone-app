import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { getUserAuthenticate } from '../../Utils/Context';
import { HiDotsHorizontal } from 'react-icons/hi';
import toast, { Toaster } from 'react-hot-toast';



const ProfilePage = () => {
  const { User, getUserData, logOut, getCreatedUserPins, createdPins, getSavedPin, savedPin, fetchData, userDetails, removePin } = getUserAuthenticate();
  const [profilePic, setprofilePic] = useState('')
  const [IsLoading, setIsLoading] = useState(true)
  const [picChange, setpicChange] = useState(true)
  const [picChangeSec, setpicChangeSec] = useState(false)
 
  useEffect(() => {
    if (savedPin){
      getSavedPin();
    }
      getCreatedUserPins();
    
  }, [User])
  
  useEffect(() => {
  fetchData();
}, [User]);
  
  async function toggleImage() {
    getCreatedUserPins();
    setpicChange(true)
    setpicChangeSec(false)
  }
  function toggleImageSec() {
    getSavedPin();
    setpicChange(false)
    setpicChangeSec(true)
  }



  return (
   <div>
      <Navbar />
      <div className='flex flex-col items-center'>
        {userDetails?.avatar ?
        <img className='rounded-full w-44 h-44 object-cover m-auto' src={userDetails?.avatar} alt="profilepic" /> :
        <div className='bg-gray-300 w-44 h-44 rounded-full relative'> 
          <span className='uppercase text-black text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{userDetails?.UsernameInput[0]}</span>
        </div>}
              <span className='mt-5 font-bold text-4xl'>{User ? userDetails?.UsernameInput : 'User not found'}</span>
              <span className='mt-2 text-gray-600 text-sm'>{User ? userDetails?.EmailInput : 'User not found'}</span>
        
            <Link to='/editProfile'><button className="btn btn-active btn-primary mt-5">Edit Profile</button></Link>
        
        <div className='flex items-center gap-5 mt-10'>
              <button onClick={toggleImage}>created</button>
                  <button onClick={toggleImageSec}>saved</button>
              </div>
             
        <div className={`${picChange ? 'block' : 'hidden'} flex justify-center flex-wrap gap-5 mt-12 p-4`}>
          {createdPins.map((items) => {
          return <img className='w-60 rounded-xl object-cover' src={items.photo} alt="image" />
        })}
        </div>

      <div className={`${picChangeSec ? 'block' : 'hidden'} flex justify-center flex-wrap gap-5 mt-12 p-4`}>
          {savedPin.map((items, index) => {
            return <div>
              <img className='w-60 rounded-xl object-cover' src={items.photo} alt="image" />
              <details className="dropdown">
            <summary className=" btn p-0 bg-transparent border-none shadow-none md:p-2 md:bg-inherit md:shadow"><HiDotsHorizontal className=" text-gray-500 text-2xl cursor-pointer" /></summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <div onClick={()=>{removePin(items)}}><li><a>Remove image</a></li></div>
            </ul>
          </details></div>
          })}
        </div>
        <Toaster />
          </div>
    </div>
  )
}

export default ProfilePage
