import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import Card from './Card';


const Homepage = () => {
  const { User, getPosts, allPosts, getPins } = getUserAuthenticate()
  useEffect(() => {
    getPins();
  }, [])
  
  return (
    <div data-theme="light" className=''>
      <Navbar />
      {/* <button onClick={getPosts}>get</button> */}
      <div className='p-2'>
        <Card />
        </div>
    </div>
  )
}
// className=" mx-20 my-auto grid grid-cols-4 gap-x-20"
export default Homepage
