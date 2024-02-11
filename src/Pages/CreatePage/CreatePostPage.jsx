import React from 'react'
import { useState } from 'react';
import Navbar from '../Navbar';
import { addDoc, collection, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { getUserAuthenticate } from '../../Utils/Context';
import { db, storage } from '../../Utils/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const CreatePostPage = () => {
  const {User, postText, getPosts} = getUserAuthenticate()
  const [post, setPost] = useState('')
  const [imagePost, setImagePost] = useState('')
  // const [allPosts, setAllPosts] = useState([])


  const postTextTest = async () => {
    
    try {
      const imgPostRef = ref(storage, `avatar/${User.uid}`)
      const snap = await uploadBytes(imgPostRef, imagePost)
      const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
      // const postRef = collection(db, 'posts')
      // await addDoc(postRef, {
      //   photo:url
      // })
      // setImagePost(url)
      await postText(url, post)
      console.log('post added')
    // await postText(imagePost)
    } catch (error) {
      console.error(error)
    }
  
  }
  console.log(imagePost)
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
  const getPostsByUserOne = async () => {
    try {
      const allPostRef = collection(db, 'posts')
    const collSnap = await getDocs(allPostRef)

    if (collSnap) {
      const allPostsData = collSnap.docs.map((doc) => doc.data());
      setAllPosts(allPostsData);
      console.log(allPosts)
    }
    } catch (error) {
      console.error(error)
    }
    
  }
  
  return (
    <div>
          <Navbar />
      <div>
        <h3 className='capitalize text-4xl'>Create post</h3>
        <input type="text" onChange={(e) => { setPost(e.target.value) }} placeholder='write post here' />
        <input type="file" onChange={(e) => { setImagePost(e.target.files[0].name) }} placeholder='write post here' />
        <button onClick={postTextTest}>post now</button>
        <button className='bg-black' onClick={getPosts}>post now</button>
        <img src="" alt="" />
          </div>
    </div>
  )
}

export default CreatePostPage
