import AuthNav from './AuthNav';
import UserNav from './userNav';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';

const RootNavigation = () => {
  const { currentUser } = useAuth();

  return currentUser ? <UserNav /> : <AuthNav />;
};

export default RootNavigation;
