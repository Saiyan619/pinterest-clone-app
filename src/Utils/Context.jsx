import React, { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './FirebaseConfig';
const getUserAuth = createContext();

export const ContextProvider = ({ children }) => {
    const [TheUser, setTheUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setTheUser(currentUser)
      })
    
      return () => unsubscribe();
      
    }, [])
    
    const signUp = async ( email, password) => {
       return await(createUserWithEmailAndPassword(auth, email, password))
    }

    const logIn = async(email, password) => {
       return await (signInWithEmailAndPassword(auth, email, password))
    } 
    
    const logOut = async () => {
      return  signOut(auth)
    }


  return (
     
      <getUserAuth.Provider value={{TheUser, logIn, logOut, signUp}}>{children}</getUserAuth.Provider>
    )
}


export const getUserAuthenticate = () => {
    return useContext(getUserAuth)
}
