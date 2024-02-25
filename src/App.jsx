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

function App() {

  return (
    <div className='bg-white'>
       <BrowserRouter>
        <ContextProvider>
          <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<PrivateRouter><ProfilePage /> </PrivateRouter>} />
          <Route path='/createPin' element={<PrivateRouter> <CreatePostPage /> </PrivateRouter>} />
          <Route path='/editProfile' element={<PrivateRouter><EditProfile /> </PrivateRouter>} />
          <Route path='/otheruserprofile/:id' element={<PrivateRouter> <OtherUsersProfilePage /></PrivateRouter>} />
            <Route path='/home' element={<PrivateRouter> <Homepage /> </PrivateRouter>} />
            <Route path='/home/pindetails/:id' element={<PrivateRouter><PinDetails /> </PrivateRouter>} />
        </Routes>
     
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
