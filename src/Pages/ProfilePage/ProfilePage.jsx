import React from 'react'
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';


const ProfilePage = () => {
    const { logOut } = getUserAuthenticate();
  return (
    <div>
          <Navbar />
          <div className='flex flex-col items-center'>
              <img className='rounded-full w-60 h-60 object-cover m-auto' src="./pexels-brian-jr-asare-13221799 (1).jpg" alt="" />
              <span>Username</span>
              <span>Email</span>
              <button>edit profile</button>
              <div>
              <button>created</button>
                  <button>saved</button>
              </div>
             
          </div>
    </div>
  )
}

export default ProfilePage
