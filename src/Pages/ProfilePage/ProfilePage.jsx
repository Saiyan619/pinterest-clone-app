import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import { getUserAuthenticate } from '../../Utils/Context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../../Utils/FirebaseConfig';
import { doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';


const ProfilePage = () => {
  const { TheUser, logOut } = getUserAuthenticate();
  const [profilePic, setprofilePic] = useState('')
  const [userDetails, setuserDetails] = useState([])

  //  useEffect(() => {
  //   const userDocRef = doc(db, 'users', TheUser.uid);
  //   const unsubscribe = onSnapshot(userDocRef, (querySnapshot) => {
  //     const usersDets = [];
  //     querySnapshot.forEach((doc) => {
  //       usersDets.push({...doc.data(), id:doc.id});
  //       setuserDetails(users)
  //     });
  //     return unsubscribe()
  //   });   
  // }, [])

  // console.log(TheUser)
  const uploadProfileImage = async () => {
    const imgRef = ref(storage, `avatar/${TheUser.uid}`)

    const snapImg = await uploadBytes(imgRef, profilePic);
    const url = await getDownloadURL(ref(storage, snapImg.ref.fullPath))

    try {
      await updateDoc(doc(db, 'users', TheUser.uid), {
        image:url
      })
    console.log('data added')  
    } catch (error) {
      console.error(error)
    }
   
  }



//   useEffect(() => {
//     if (!TheUser || !TheUser.uid) {
//       console.error('User not authenticated or uid is null');
//       return;
//     }
  
//     // const userDocRef = doc(db, 'users', TheUser.uid);

//     const userDocRef = doc(db, 'users', TheUser.uid);
//     const unsubscribe = onSnapshot(userDocRef, (doc) => {
//       const usersDets = [];
// console.log(doc.data())
//       const userDets = { ...doc.data(), id: doc.id };
//       console.log(doc.data())
//       setuserDetails(userDets);
      
  
//       // Set the state once, after processing all documents
//       setuserDetails(usersDets);
//     });
  
//     // Return the unsubscribe function to clean up the subscription
//     return () => unsubscribe();
//   }, [TheUser]);
 
  
  // console.log(userDetails)
  // useEffect(async () => {
  //   const docRef = doc(db, "users", TheUser.uid);
  //   const docSnap = await getDoc(docRef);
    
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     // docSnap.data() will be undefined in this case
  //     console.log("No such document!");
  //   }
  // }, [])
  
  const getData = async () => {
    const docRef = doc(db, "users", TheUser.uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  }

  return (
    <div>
          <Navbar />
      <div className='flex flex-col items-center'>
        <button className='bg-black' onClick={getData}>test</button>
              <img className='rounded-full w-60 h-60 object-cover m-auto' src="./pexels-brian-jr-asare-13221799 (1).jpg" alt="" />
              <span>Username</span>
              <span>Email</span>
              <button>edit profile</button>
        <div>
          <input type="file" onChange={(e)=>{setprofilePic(e.target.files[0])}} name="" id="" />
              <button onClick={uploadProfileImage}>created</button>
                  <button>saved</button>
              </div>
             
          </div>
    </div>
  )
}

export default ProfilePage
