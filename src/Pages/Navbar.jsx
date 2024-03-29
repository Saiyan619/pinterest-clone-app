import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Dialog from '../Mini-Components/Dialog'
import { getUserAuthenticate } from '../Utils/Context'

const Navbar = () => {
  const { logOut, User, userDetails, fetchData } = getUserAuthenticate();
  const navigate = useNavigate();
  console.log(userDetails)
  useEffect(() => {
    fetchData()
  }, [User])
  
  const logoutUser = async() => {
    try {
            await logOut()
            console.log('done')
              navigate('/');
          } catch (err) {
              console.error(err)
          }
        
  }

  function notice() {
    alert('The search feature is still in production. Come back later and check again')
  }
  return (
    <div className='p-2 flex items-center justify-between'>
          <div className='border border-solid border-black rounded-lg sm:border-0'>
            <Link to='/home'><span className='hidden transition-all duration-1000 hover:transition-all sm:duration-500 hover:bg-black hover:text-white p-4 rounded-full sm:block'>Home</span></Link>
            <Link to='/home'><img className='w-12 block sm:hidden' src="./icons8-home(1).svg" alt="home" /></Link>
          </div>
          
          <div>
          <Link to='/createPin'> <span className='hidden transition-all duration-1000 hover:transition-all sm:duration-500 hover:bg-black hover:text-white p-4 rounded-full sm:block'>Create</span></Link>
          <Link to='/createPin'>  <img className='w-10 block sm:hidden' src="./icons8-add-50(2).png" alt="create" /></Link>
          </div>
          
          <div onClick={notice} className='w-6/12 sm:w-9/12'>
          <input type="text" placeholder="Type here" className="border border-solid border-black outline-none rounded-full h-10 w-full p-2 " />   
          </div>
          
          <div>
        <div className="dropdown dropdown-end z-10">
        {userDetails?.avatar ? (
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar z-10">
    <img className='rounded-full z-50 w-12 h-12 object-cover m-auto' src={userDetails?.avatar} alt="profilepic" />
  </div>
) : (
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar z-10">
    <span className='bg-gray-300 w-full h-full text-lg z-50 rounded-full flex items-center justify-center uppercase'>{userDetails?.UsernameInput[0]}</span>
  </div>
)}
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        <Link className="justify-between" to='/profile'>
            Profile
            <span className="badge">New</span>
          </Link> 
            </li>
            <Link to='/editProfile' >
              <li><a>Profile Settings</a></li>
              </Link>
            <li><Dialog logoutUser={logoutUser} /></li>
      </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
