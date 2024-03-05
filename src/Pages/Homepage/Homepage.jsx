import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import Pin from './Pin';

const Homepage = () => {
  const {getPins, loader, setLoader } = getUserAuthenticate()
  useEffect(() => {
     const timeoutId = setTimeout(() => {
       setLoader(false);
  }, 5000);
    getPins();
    return () => clearTimeout(timeoutId);
  }, [])
  console.log(loader)

  return (

    <div className=''>
      <Navbar />
      
      <div className='p-2'>
       {loader ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'> <span className="loading loading-ring loading-lg "></span><span>Your pins are loading Please Wait😎😋...</span></div> : <Pin />}
        
      </div>
      
    </div>
  )
}
export default Homepage
