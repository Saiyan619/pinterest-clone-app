import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getUserAuthenticate } from '../../Utils/Context'
import Navbar from '../PinDetails/Navbar'

const OtherUsersProfilePage = () => {
    const {User, OtherUsers, otherUsercreatedPins, fetchOtherUserData} = getUserAuthenticate()
    const { id } = useParams()
  console.log(id)
  
  useEffect(() => {
    fetchOtherUserData(id)
  }, [User])
  
  return (
    <div>
      <Navbar />
      <div className='flex flex-col items-center'>
        {OtherUsers?.avatar ?
        <img className='rounded-full w-44 h-44 object-cover m-auto' src={OtherUsers?.avatar} alt="profilepic" /> :
        <div className='bg-gray-300 w-44 h-44 rounded-full relative'> 
          <span className='uppercase text-black text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{OtherUsers?.UsernameInput[0]}</span>
        </div>}
              <span className='mt-5 font-bold text-4xl'>{User ? OtherUsers?.UsernameInput : 'User not found'}</span>
              <span className='mt-2 text-gray-600 text-sm'>{User ? OtherUsers?.EmailInput : 'User not found'}</span>
        
            {/* <Link to='/editProfile'><button className="btn btn-active btn-primary mt-5">Edit Profile</button></Link> */}
        
         <div className='flex items-center gap-5 mt-10'>
              <button >created</button>
              </div>
             
       <div className= 'flex justify-center flex-wrap gap-5 mt-12 p-4'>
          {otherUsercreatedPins.map((items) => {
          return <img className='w-60 rounded-xl object-cover' src={items.photo} alt="image" />
        })}
        </div>
{/* 
      <div className={`${picChangeSec ? 'block' : 'hidden'} flex justify-center flex-wrap gap-5 mt-12 p-4`}>
          {savedPin.map((items, index) => {
            return <img className='w-60 rounded-xl object-cover' src={items.photo} alt="image" />
          })}
        </div> */}
          </div>
    </div>
  )
}

export default OtherUsersProfilePage
