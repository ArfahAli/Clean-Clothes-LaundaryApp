import { useState, useEffect } from 'react';
import { auth } from '../Configure/firebaseConfig';
import { createUserWithEmailAndPassword,onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import useFirestore from './useFirestore';
const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setUser(undefined);
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);
  


    const signUp = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const { setUserProfile } = useFirestore();
            await setUserProfile({ email, password });
            return { success: true };
        } catch (error) {
            console.error("Error signing up: ", error.message);
            return { success: false, message: error.message };
        }
    };
      
    const Login =async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
        const { getUserProfile } = useFirestore();
        const user = await getUserProfile({email, password});
        setUser(user);
    }
   
    const signOutUser = async () => {
        await signOut(auth);
        setUser(null);
        
    };
    return { user, signUp, Login, loading, signOutUser };
};

export default useAuth;
