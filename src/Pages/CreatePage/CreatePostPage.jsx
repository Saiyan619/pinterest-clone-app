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
//   const postText = async (postInput) => {
//     try {
//       const postRef = collection(db, 'posts')
//     await addDoc(postRef, {
//       postInput,
//       createdAt: serverTimestamp(),
//       postedBy:User.displayName
//     })
//       console.log('posted')
//     } catch (error) {
//       console.error(error)
//     }
    
  // }
  // const getPosts = async () => {
  //   try {
  //     const allPostRef = collection(db, 'posts')
  //   const collSnap = await getDocs(allPostRef)

  //   if (collSnap) {
  //     const allPostsData = collSnap.docs.map((doc) => doc.data());
  //     setAllPosts(allPostsData);
  //     console.log(allPosts)
  //   }
  //   } catch (error) {
  //     console.error(error)
  //   }
    
  // }
  
  return (
    <div>
          <Navbar />
      <div>
        <h3 className='capitalize text-4xl'>Create post</h3>
        <input type="text" onChange={(e) => { setPost(e.target.value) }} placeholder='write post here' />
        <input type="file" onChange={(e) => { setImagePost(e.target.files[0]) }} placeholder='write post here' />
        <button onClick={postTextTest}>post now</button>
        <button className='bg-black' onClick={getPosts}>post now</button>
        <img src="" alt="" />
          </div>
    </div>
  )
}

export default CreatePostPage
