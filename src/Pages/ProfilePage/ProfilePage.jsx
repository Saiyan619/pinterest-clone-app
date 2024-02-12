import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../Utils/FirebaseConfig';
import { doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';


const ProfilePage = () => {
  const { User, getUserData, logOut, getCreatedUserPins, createdPins } = getUserAuthenticate();
  const [profilePic, setprofilePic] = useState('')
  const [userDetails, setuserDetails] = useState()
  const [IsLoading, setIsLoading] = useState(true)
  const [picChange, setpicChange] = useState(true)
  const [picChangeSec, setpicChangeSec] = useState(false)
  // console.log(User)
  const getuserpins =  () => {
     getCreatedUserPins();
  }
  async function toggleImage() {
  
    setpicChange(true)
    setpicChangeSec(false)
  }
  function toggleImageSec() {
    setpicChange(false)
    setpicChangeSec(true)
  }
useEffect(() => {
  const fetchData = async () => {
    if (User) {
      const docRef = doc(db, 'users', User?.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setuserDetails(docSnap.data());
      }
    }
  };
  fetchData();
}, [User]);
  const getData = async () => {
    getDoc(doc(db, 'users', User.uid)).then((docSnap => {
           if (docSnap.exists) {
            setuserDetails(docSnap.data())
           }
         }))
  }
  // console.log(userDetails)

   
  const uploadProfileImage = async () => {
    const imgRef = ref(storage, `avatar/${User.uid}`)

    const snapImg = await uploadBytes(imgRef, profilePic);
    const url = await getDownloadURL(ref(storage, snapImg.ref.fullPath))

    try {
      await updateDoc(doc(db, 'users', User.uid), {
        image:url
      })
    console.log('data added')  
    } catch (error) {
      console.error(error)
    }
   
  }


  return (
   <div>
          <Navbar />
      <div className='flex flex-col items-center'>
        {userDetails?.image ?
        <img className='rounded-full w-44 h-44 object-cover m-auto' src={userDetails?.image} alt="" /> :
        <div className='bg-gray-300 w-44 h-44 rounded-full relative'> 
          <span className='uppercase text-black text-8xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>{userDetails?.UsernameInput[0]}</span>
        </div>}
              <span className='mt-5 font-bold text-4xl'>{User ? userDetails?.UsernameInput : 'User not found'}</span>
              <span className='mt-2 text-gray-600 text-sm'>{User ? userDetails?.EmailInput : 'User not found'}</span>
        
        {/* <div className='flex items-center'>
                  <input type="file" onChange={(e)=>{setprofilePic(e.target.files[0])}} name="" id="" />
                  <button onClick={uploadProfileImage}>created</button>

        </div> */}
              <button className="btn btn-active btn-primary mt-5">Edit Profile</button>
        {createdPins.map((items) => {
          return <span>{items.postInput}</span>
        })}
        <div className='flex items-center gap-5 mt-10'>
              <button onClick={getuserpins}>created</button>
                  <button onClick={getuserpins}>saved</button>
              </div>
             
        <div className={`${picChange ? 'block' : 'hidden'}`}>
          <img className='w-60' src="./pexels-brian-jr-asare-13221799 (1).jpg" alt="test" />
        </div>

      <div className={`${picChangeSec ? 'block' : 'hidden'}`}>
        <img className='w-60' src="./pexels-yuri-manei-2690323 (1).jpg" alt="test" />
        </div>
          </div>
    </div>
  )
}

export default ProfilePage
