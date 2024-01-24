
import AuthNav from './AuthNav';
import UserNav from './userNav';
import useAuth from '../hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import { AuthContext } from '../../contexts/AuthContext';
const RootNavigation = () => {
  const currentUser = useContext(AuthContext);
  if (currentUser.currentUser === null) return <AuthNav />;
  else if (currentUser.currentUser.isAdmin) return <AdminNav />;
  else return <UserNav />;
};

export default RootNavigation;