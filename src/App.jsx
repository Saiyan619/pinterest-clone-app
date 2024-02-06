import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login'
import SignUp from './Pages/SignUp'
import { ContextProvider } from './Utils/Context';
import Homepage from './Pages/Homepage/Homepage';
import PrivateRouter from './Utils/PrivateRouter';
import ProfilePage from './Pages/ProfilePage/ProfilePage';
import CreatePostPage from './Pages/CreatePage/CreatePostPage';

function App() {

  return (
    <div >
       <BrowserRouter>
        <ContextProvider>
          <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/createPin' element={<CreatePostPage />} />
          <Route path='/home' element={<PrivateRouter> <Homepage /> </PrivateRouter>} />
        </Routes>
     
      </ContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
