import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import Pin from './Pin';

const Homepage = () => {
  const { User, getPins } = getUserAuthenticate()
  useEffect(() => {
    getPins();
  }, [])
  return (

    <div data-theme="light" className=''>
      <Navbar />
      
      {/* <button onClick={getPosts}>get</button> */}
      <div className='p-2'>
        <Pin />
      </div>
      
    </div>
  )
}
export default Homepage
