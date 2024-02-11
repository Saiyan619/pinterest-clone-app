import React from 'react'
import { useEffect } from 'react';
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';


const Homepage = () => {
  const { User, getPosts, allPosts, getPins } = getUserAuthenticate()
  useEffect(() => {
    getPins();
  }, [])
  
  // console.log(User)
  return (
    <div data-theme="light" className=''>
      <Navbar />
      <button onClick={getPosts}>get data</button>
      {allPosts.map((items) => {
        return <div><p className='text-black'>{items.post || items.postInput} by {items.postedBy}</p>
         <img src={items.photo} alt="" />
        </div>
      })}
    </div>
  )
}

export default Homepage
