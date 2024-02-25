import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAuthenticate } from './Context'

const PrivateRouter = ({ children }) => {
    const { User } = getUserAuthenticate();
    const navigate = useNavigate();
    useEffect(() => {
      if (!User) {
        return navigate('/');
       }
    }, [])

  return children

}

export default PrivateRouter
