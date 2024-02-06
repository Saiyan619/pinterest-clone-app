import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserAuthenticate } from './Context'

const PrivateRouter = ({ children }) => {
    const { TheUser } = getUserAuthenticate();
    const navigate = useNavigate();
    // useEffect(() => {
       
    // }, [])

  { if (TheUser) {
    return children
} else {
    // console.log('hompage')
    return navigate('/')
}}
}

export default PrivateRouter
