import React from 'react'
import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import { db, storage } from '../../Utils/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import toast, { Toaster } from 'react-hot-toast';



const CreatePostPage = () => {
  const {User, postPin, spinner, getPins } = getUserAuthenticate()
  const [post, setPost] = useState('')
  const [imagePost, setImagePost] = useState('')
  const [selectedOption, setselectedOption] = useState('')

  function handleSelectedOption(e) {
    setselectedOption(e.target.value)
    console.log(selectedOption)
  }
// useEffect(() => {
//   getPins()
// }, [])


  const postTextAndImage = async () => {
    
    try {
      const timestamp = new Date().getTime(); 
      let url;
      if (imagePost) {
        const imgPostRef = ref(storage, `pins/${User.uid}/${timestamp}`);
        const snap = await uploadBytes(imgPostRef, imagePost)
        const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url = getUrl
}
     
      await postPin(url, post, selectedOption)
      setImagePost('')
      setPost('')
    } catch (error) {
      console.error(error)
    }
  
  }
console.log(selectedOption)
  
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
    
        <div className='flex items-center flex-col gap-4 mt-4 sm:flex-row'>
        <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Pick a Category</span>
  </div>
  <select value={selectedOption} onChange={handleSelectedOption} className="select select-bordered w-full max-w-xs">
  <option selected >People</option>
  <option value='People'>People</option>
  <option value='Animal'>Animal</option>
  <option value='Things'>Things</option>
</select>
  <div className="label">
    <span className="label-text-alt">Note: Picking a category isn'nt compulsory but hepls in searching for pins</span>
  </div>
          </label>
          
<input type="text"  onChange={(e) => { setPost(e.target.value) }} placeholder="write Caption here" className="input input-bordered w-full max-w-xs" />
        </div>
        <button onClick={postTextAndImage} className="btn bg-purple-800 mt-5 text-white">
  <span  className={`${spinner ? 'loading' : ''} loading-spinner `}></span>
  Post
</button>
        {/* <button className='bg-black' onClick={getPosts}>post now</button> */}
        <Toaster />
          </div>
    </div>
  )
}

export default CreatePostPage
