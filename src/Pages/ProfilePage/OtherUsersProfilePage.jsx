import React from 'react'
import { useParams } from 'react-router-dom'

const OtherUsersProfilePage = () => {
    const { id } = useParams()
    console.log(id)
  return (
    <div>
      OtherUsersProfilePage
OtherUsersProfilePage
    </div>
  )
}

export default OtherUsersProfilePage
