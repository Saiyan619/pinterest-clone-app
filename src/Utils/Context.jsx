import React, { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './FirebaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';

const getUserAuth = createContext();

export const ContextProvider = ({ children }) => {
  const [User, setUser] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [createdPins, setCreatedPins] = useState([])
  
  // const getUserData = async () => {
  //   let data;  // Declare data variable outside the if statement
  //   if(auth.currentUser) {
  //     console.log("User: ",auth.currentUser );
  //     const userRef = doc(db, "users", auth.currentUser?.uid);
  //     const data = await getDoc(userRef);
  //     if(!data.exists()) console.log("Not Found");
  //     else console.log("User Data Found: ", data.data());
  //   }else console.log("User Not Found");
  //   }
  
    const signUp = async ( email, password) => {
       return await (createUserWithEmailAndPassword(auth, email, password))
      // return signUpResult.user
      
    }

    const logIn = async(email, password) => {
      const loginResults = await (signInWithEmailAndPassword(auth, email, password))
      return loginResults.user
    } 
    
    const logOut = async () => {
      return  signOut(auth)
  }
  
  

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
   setUser(user)
    })
  
    return () => unsubscribe();    
    }, [])
  
    const postText = async (postImg, postInput, category) => {
      try {
        const postRef = collection(db, 'posts')
        await addDoc(postRef, {
        photo:postImg || '',
        postInput,
        category:'',
        createdAt: serverTimestamp(),
        postedBy:User.displayName
      })
        console.log('posted')
      } catch (error) {
        console.error(error)
      }
      
  }

  const getPins = () => {
    const allPostRef = collection(db, 'posts');
    const unsub = onSnapshot(allPostRef, (querySnapshot) => {
      const pins = [];
      querySnapshot.forEach((doc) => {
        pins.push({ ...doc.data(), id: doc.id });
        setAllPosts(pins)
        console.log(allPosts)
      })
    });

    return () => unsub(); 
  }
  const getCreatedUserPins = async() => {
       try {
        const q = query(collection(db, "posts"), where("postedBy", "==", User.displayName));
         //  const queryRef = await getDocs(q)
         const querySnapshot = await getDocs(q);
         let userCreatedPins = []
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
  
  userCreatedPins.push(doc.data())
  setCreatedPins(userCreatedPins)
});
         console.log(createdPins)
       
       } catch (error) {
        console.error(error)
       }
  }
  
  const getPosts = async () => {
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

    // const q = query(collection(db, "users"), where("uid", "!=", User1));
    // const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //   const users = [];
    //   querySnapshot.forEach((doc) => {
    //     users.push({...doc.data(), id:doc.id});
    //     setUserList(users)
    //   });
    //   return unsubscribe()
    // });
        
    
  }


  return (
     
      <getUserAuth.Provider value={{User, allPosts, createdPins, getCreatedUserPins, getPins, postText, getPosts, logIn, logOut, signUp}}>{children}</getUserAuth.Provider>
    )
}


export const getUserAuthenticate = () => {
    return useContext(getUserAuth)
}
