import React from 'react'
import Homepage from './Pages/Homepage/Homepage'
import CreatePostPage from './Pages/CreatePage/CreatePostPage'
import ProfilePage from './Pages/ProfilePage/ProfilePage'
import Navbar from './Pages/Navbar'

const MyApp = () => {
  return (
      <div>
          <Navbar />
          <Homepage />
          <CreatePostPage />
          <ProfilePage />
    </div>
  )
}

export default MyApp
