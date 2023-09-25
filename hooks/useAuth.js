import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function useAuth() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isLoggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (userInfo.token) {
      setLoggedIn(true)
    }
  }, [userInfo]);
  
  return isLoggedIn;
}
