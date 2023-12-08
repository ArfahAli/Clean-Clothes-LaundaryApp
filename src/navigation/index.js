import AuthNav from './AuthNav';
import UserNav from './userNav';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

const RootNavigation = () => {
  const { user } = useAuth();

  return user ? <UserNav /> : <AuthNav />;
};

export default RootNavigation;
