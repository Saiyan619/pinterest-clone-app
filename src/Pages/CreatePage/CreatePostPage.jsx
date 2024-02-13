import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { addDoc, collection, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getUserAuthenticate } from '../../Utils/Context';
import { db, storage } from '../../Utils/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const CreatePostPage = () => {
  const {User, postText, getPosts, getPins } = getUserAuthenticate()
  const [post, setPost] = useState('')
  const [imagePost, setImagePost] = useState('')
  // const [allPosts, setAllPosts] = useState([])
useEffect(() => {
  getPins()
}, [])


  const postTextTest = async () => {
    
    try {
      const timestamp = new Date().getTime(); 
      let url;
      if (imagePost) {
        const imgPostRef = ref(storage, `pins/${User.uid}/${timestamp}`);
        const snap = await uploadBytes(imgPostRef, imagePost)
        const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url = getUrl
}
     
      await postText(url, post)
      setImagePost('')
  
    } catch (error) {
      console.error(error)
    }
  
  }

  
  return (
    <div>
          <Navbar />
      <div className='p-4'>
        <h3 className='capitalize text-4xl mt-5 mb-5'>Create post</h3>
        <div className="relative border-dashed border-2 border-gray-400 rounded-md p-4 w-full">
  <input
            type="file"
            onChange={(e) => { setImagePost(e.target.files[0]) }}
    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
    // Other input attributes and event handlers go here
  />
  <div className="flex items-center justify-center">
    <svg
      className="w-6 h-80 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      ></path>
    </svg>
    {imagePost ? (
          <p className="ml-2">{imagePost.name}</p>
        ) : (
          <p className="ml-2">Upload File</p>
        )}
  </div>
        </div>
        
        

        <div className='flex flex-col gap-4 mt-4 sm:flex-row'>
        <select className="select select-bordered w-full max-w-xs">
  <option disabled selected>Pick a Category</option>
  <option>People</option>
  <option>Animal</option>
  <option>Things</option>
</select>
<input type="text"  onChange={(e) => { setPost(e.target.value) }} placeholder="write Caption here" className="input input-bordered w-full max-w-xs" />
        </div>
        <button onClick={postTextTest} className="btn btn-active btn-primary mt-5">Post</button>

        {/* <button className='bg-black' onClick={getPosts}>post now</button> */}
          </div>
    </div>
  )
}

export default CreatePostPage
