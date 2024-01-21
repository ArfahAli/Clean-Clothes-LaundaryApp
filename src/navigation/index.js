import AuthNav from './AuthNav';
import UserNav from './userNav';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import AdminNav from './AdminNav'
const RootNavigation = () => {
  const { currentUser } = useAuth();

  // return currentUser ? <UserNav /> : <AuthNav />;
  return currentUser ? <AdminNav /> : <AuthNav />;

};

export default RootNavigation;
