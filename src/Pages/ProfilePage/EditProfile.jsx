import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../Utils/FirebaseConfig";
import { getUserAuthenticate } from "../../Utils/Context";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Navbar from "../Navbar";

const EditProfile = () => {
  const { User } = getUserAuthenticate();
    const [newUsername, setnewUsername] = useState("");
    const [newProfileImage, setnewProfileImage] = useState("")

  const updateProfile = async () => {
      try {
        // const timestamp = new Date().getTime();
        // let url;
        // if (imagePost) {
        //   const imgPostRef = ref(storage, `pins/${User.uid}/${timestamp}`);
        //   const snap = await uploadBytes(imgPostRef, imagePost)
        //   const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
          //   url = getUrl

          const timestamp = new Date().getTime(); 
          let url;
          if (newProfileImage) {
            const imgRef = ref(storage, `avatar/${User.uid}/${timestamp}`)
          const snap = await uploadBytes(imgRef, newProfileImage)
              const getUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
              url = getUrl;
          }
          
      const updateRef = doc(db, "users", User.uid);
      await updateDoc(updateRef, {
          UsernameInput: newUsername,
          avatar: url
      });
        console.log('updated')
    } catch (error) {
        console.error(error)
    }
    };
    console.log(newProfileImage)
console.log(newUsername)
  return (
    <div>
      <Navbar />
    <div className="p-4">
      <h2 className="text-5xl">Edit Profile</h2>
      <div className="mt-10">
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Change Profile Picture</span>
          </div>
                  <input
                      onChange={(e)=>{setnewProfileImage(e.target.files[0])}}
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
          />
          <div className="label"></div>
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Change Username</span>
          </div>
          <input
            onChange={(e) => {
              setnewUsername(e.target.value);
            }}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label"></div>
        </label>

        <div>
          <button onClick={updateProfile} className="btn btn-active btn-primary mt-5">
            Update Profile
          </button>
        </div>
      </div>
      </div>
      </div>
  );
};

export default EditProfile;
