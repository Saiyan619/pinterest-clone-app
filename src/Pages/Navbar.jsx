import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Dialog from '../Mini-Components/Dialog'
import { getUserAuthenticate } from '../Utils/Context'

const Navbar = () => {
  const { logOut } = getUserAuthenticate();
  const navigate = useNavigate();
  const logoutUser = async() => {
    try {
            await logOut()
            console.log('done')
              navigate('/');
          } catch (err) {
              console.error(err)
          }
        
  }
  return (
    <div className='p-2 flex items-center justify-between'>
          <div className='border border-solid border-black rounded-lg sm:border-0'>
            <Link to='/home'><span className='hidden transition-all duration-1000 hover:transition-all sm:duration-500 hover:bg-black hover:text-white p-4 rounded-full sm:block'>Home</span></Link>
            <Link to='/home'>    <img className='w-12 block sm:hidden' src="./icons8-home(1).svg" alt="" /></Link>
          </div>
          
          <div>
          <Link to='/createPin'> <span className='hidden transition-all duration-1000 hover:transition-all sm:duration-500 hover:bg-black hover:text-white p-4 rounded-full sm:block'>Create</span></Link>
          <Link to='/createPin'>  <img className='w-10 block sm:hidden' src="./icons8-add-50(2).png" alt="" /></Link>
          </div>
          
          <div className='w-6/12 sm:w-9/12'>
          <input type="text" placeholder="Type here" className="border border-solid border-black outline-none rounded-full h-10 w-full p-2 " />   
          </div>
          
          <div>
              <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
        <Link to='/profile'> <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a></Link> 
        </li>
        <li><a>Settings</a></li>
            <li><Dialog logoutUser={logoutUser} /></li>
      </ul>
    </div></div>
    </div>
  )
}

export default Navbar
