import { useState, useEffect } from 'react';
import { auth } from '../Configure/firebaseConfig';
import { createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useFirestore from './useFirestore';
import { AuthContext } from '../../contexts/AuthContext';
import { useContext } from 'react';
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { setUserProfile, getUserProfile } = useFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const userProfile = await getUserProfile(user.uid);
            setCurrentUser({ ...user, ...userProfile }); // Use setCurrentUser
          } else {
            setCurrentUser(null); // Use setCurrentUser
          }
          setLoading(false);
        });
        return () => unsubscribe();
      }, []);
  


      const signUp = async (email, password, data) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          delete data.password; // Don't store password in the user profile
          await setUserProfile(userCredential.user.uid, data);
          setCurrentUser({ ...userCredential.user, ...data }); // Update currentUser
        } catch (error) {
          Alert.alert('Sign Up Error', error.message);
        }
      };
      
    const Login =async (email, password) => {
      setLoading(true);
      try {
          await signInWithEmailAndPassword(auth, email, password);
          const userProfile = await getUserProfile(auth.currentUser.uid);
          setCurrentUser({ ...auth.currentUser, ...userProfile });
      } catch (error) {
          console.log('uh oh');
          console.log(error.message);
          Alert.alert('Sign In Error', error.message); // Using Alert here
      }
      setLoading(false);
    }
   
    const signOutUser = async () => {
        try {
          await auth().signOut();
          console.log('User signed out!');
        } catch (error) {
          console.error('Error signing out: ', error);
          // Handle error (e.g., show an error message to the user)
        }
      };
    return { user, signUp, Login, loading, signOutUser, currentUser };
};

export default useAuth;
