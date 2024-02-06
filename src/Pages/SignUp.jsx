import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import backgImage from "/pexels-yuri-manei-2690323 (1).jpg";
import { getUserAuthenticate } from "../Utils/Context";
import Modal from "../Mini-Components/Modal";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { db } from "../Utils/FirebaseConfig";

// function toggleSpinner() {
//     setSpinner(!Spinner)
// }

const SignUp = () => {
  const { theUser, signUp } = getUserAuthenticate();
  const navigate = useNavigate();
    const [Spinner, setSpinner] = useState(true);
    const [closeModal, setcloseModal] = useState(true)
  const [UsernameInput, setUsernameInput] = useState("");
  const [EmailInput, setEmailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");

    function ModalClose() {
        setcloseModal(!closeModal)
        setSpinner(true)
    }
    const signUpUser = async () => {
        
      if (UsernameInput !== '' && EmailInput  && passwordInput !== '') {
          try {
            setSpinner(false)
              const res = await signUp(EmailInput, passwordInput);
            console.log(res.user)
            updateProfile(res.user, {displayName:UsernameInput})
            
          await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              UsernameInput,
              EmailInput,
              passwordInput,
          })
            console.log(res.user)
            console.log("user is signed up");
            navigate("/home");
        } catch (error) {
            setcloseModal(false)
            console.error(error);
          }
      } else {
        setcloseModal(false)
          console.log('empty')
      }
   
  };
  console.log(theUser)
  return (
      <div className="relative">
          <Modal closeModal={closeModal} ModalClose={ModalClose} />
      <div className="bg-cover bg-center relative">
        <img
          className="h-screen w-full object-cover"
          src={backgImage}
          alt="background image"
        />
      </div>
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col gap-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Username</span>
            </div>
            <input
              onChange={(e) => {
                setUsernameInput(e.target.value);
              }}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-96 h-12 rounded-full max-w-xs bg-white"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Email</span>
            </div>
            <input
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              type="email"
              placeholder="Type here"
              className="input input-bordered w-96 h-12 rounded-full max-w-xs bg-white"
            />
          </label>
          {/*           
              <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text text-white">Select a Profile Picture</span>
  </div>
  <input type="file" className="file-input h-8 file-input-bordered w-full max-w-xs" />
</label>  */}

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-white">Password</span>
            </div>
            <input
              onChange={(e) => {
                setpasswordInput(e.target.value);
              }}
              type="password"
              placeholder="Type here"
              className="input input-bordered w-96 h-12 rounded-full max-w-xs bg-white"
            />
          </label>

          <button onClick={signUpUser} className="btn">
            <span
              className={
                Spinner ? "loading-spinner" : " loading loading-spinner"
              }
            ></span>
            Register
          </button>
        </div>
        <span className="text-white">
          Already have an Account?
          <Link className="underline hover:text-blue-400" to="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
