import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { ContextProvider } from './Utils/Context';
import Homepage from './Pages/Homepage/Homepage';
import PrivateRouter from './Utils/PrivateRouter';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import CreatePostPage from './Pages/CreatePage/CreatePostPage';
import PinDetails from './Pages/PinDetails/PinDetails';
import EditProfile from './Pages/ProfilePage/EditProfile';
import OtherUsersProfilePage from './Pages/ProfilePage/OtherUsersProfilePage';
import Test12 from './Test12';

function App() {

  return (
    <div className='bg-white'>
       <BrowserRouter>
        <ContextProvider>
          <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/createPin' element={<CreatePostPage />} />
          <Route path='/test' element={<Test12 />} />
          <Route path='/editProfile' element={<EditProfile />} />
          <Route path='/otheruserprofile/:id' element={<OtherUsersProfilePage />} />
            <Route path='/home' element={<PrivateRouter> <Homepage /> </PrivateRouter>} />
            <Route path='/home/pindetails/:id' element={<PinDetails />} />
        </Routes>
     
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
