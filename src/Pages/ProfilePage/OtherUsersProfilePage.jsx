import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserAuthenticate } from '../../Utils/Context'

const OtherUsersProfilePage = () => {
    const {User, OtherUsers, fetchOtherUserData} = getUserAuthenticate()
    const { id } = useParams()
    console.log(id)
  return (
      <div>
          <button onClick={()=>{fetchOtherUserData(id)}} className='bg-black text-white p-4'>get profile</button>
      OtherUsersProfilePage
OtherUsersProfilePage
    </div>
  )
}

export default OtherUsersProfilePage
