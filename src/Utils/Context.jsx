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
  const [pinDetails, setPinDetails] = useState([])
  const [similarPosts, setsimilarPosts] = useState([])
  
    const signUp = async ( email, password) => {
       return await (createUserWithEmailAndPassword(auth, email, password))
    }

    const logIn = async(email, password) => {
      const loginResults = await (signInWithEmailAndPassword(auth, email, password))
      return loginResults.user
    } 
    
    const logOut = async () => {
      return  signOut(auth)
  }
  
  // Tracks when a user is logged in or not
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
   setUser(user)
    })
  
    return () => unsubscribe();    
    }, [])
  
  // For giving my docs a random id (still gunna find a better way of getting a random id, but that won't be necessary since im using addoc for the mean time)
    const currentTimestamp = Math.floor(new Date().getTime() / 1000);
    const formattedTimestamp = new Date(currentTimestamp * 1000).toLocaleString();
  // const pinId = currentTimestamp;

  // FUNCTION:For Posting .. used in the CreatePostPage Component
    const postText = async (postImg, postInput, category) => {
      try {
        const postRef = collection(db, 'posts')
        await addDoc(postRef, {
          profilePhoto:User.photoURL,
        photo:postImg || '',
        postInput,
        category,
        createdAt: formattedTimestamp,
        postedBy:User.displayName
      })
        console.log('posted')
      } catch (error) {
        console.error(error)
      }
      
  }

  // FUNCTION:For getting all posts to be displayed on the FYP... Used in the Homepage component
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

  // FUNCTION:For getting the pin posted/created by the current user... Used in the profile page
  const getCreatedUserPins = async() => {
       try {
        const q = query(collection(db, "posts"), where("postedBy", "==", User.displayName));
         const querySnapshot = await getDocs(q);
         let userCreatedPins = []
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  
  userCreatedPins.push(doc.data())
  setCreatedPins(userCreatedPins)
});
         console.log(createdPins)
       
       } catch (error) {
        console.error(error)
       }
  }
  
  const getSimilarPins = async (category) => {
       try {
        if (category) {
          const q = query(collection(db, 'posts'), where('category', '==', category));
          const querySnapshot = await getDocs(q);
    
          let userSimilarPins = [];
          querySnapshot.forEach((doc) => {
            console.log(doc.id, ' => ', doc.data());
            userSimilarPins.push(doc.data());
          });
  setsimilarPosts(userSimilarPins)
};
         console.log(similarPosts)
       
       } catch (error) {
        console.error(error)
       }
  }
  


// FUNCTION:For getting the post details when clicked... Used in the pindetails component
  const getPostDetails = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const pinDets = docSnapshot.data();
        setPinDetails(pinDets);
  
        // Log pinDetails after the state has been updated
      } else {
        console.log("Document not found");
      }
  
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  
  


  return (
     
      <getUserAuth.Provider value={{User, allPosts, createdPins, pinDetails, similarPosts, getSimilarPins, getPostDetails, getCreatedUserPins, getPins, postText, logIn, logOut, signUp}}>{children}</getUserAuth.Provider>
    )
}


export const getUserAuthenticate = () => {
    return useContext(getUserAuth)
}
