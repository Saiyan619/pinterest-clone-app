import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import backgImage from "/pexels-yuri-manei-2690323 (1).jpg";
import { getUserAuthenticate } from "../Utils/Context";
import Modal from "../Mini-Components/Modal";

// function toggleSpinner() {
//     setSpinner(!Spinner)
// }

const Login = () => {
  const { User, getUserData, logIn } = getUserAuthenticate();

  const navigate = useNavigate();

  const [EmailInput, setEmailInput] = useState("");
  const [passwordInput, setpasswordInput] = useState("");
  const [Spinner, setSpinner] = useState(true);
  const [closeModal, setcloseModal] = useState(true);

  function ModalClose() {
    setcloseModal(!closeModal);
    setSpinner(true);
  }


    const LoginUser = async () => {
        
        if (EmailInput !== "" && passwordInput !== "") {
      try {
        setSpinner(false);
        await logIn(EmailInput, passwordInput);
        console.log("logged in");
        // console.log(user)
        navigate("/home");
      } catch (error) {
        setcloseModal(false);
        console.error(error);
      }
        } else {
            setSpinner(false)
      setcloseModal(false);
      console.log("empty");
    }
  };
  // useEffect(() => {
  //   getData(); //If user Logged in this will print UserData If not will print User Not Found
  // }, [currentUser])

  // async function getData() {
  //   await getUserData();
  // }

  // console.log(currentUser)


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

          <button onClick={LoginUser} className="btn">
            <span
              className={
                Spinner ? "loading-spinner" : " loading loading-spinner"
              }
            ></span>
            Login{" "}
          </button>
        </div>
        <span className="text-white">
          Don't have an Account?
          <Link className="underline hover:text-blue-400" to="/">
            SignUp
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
