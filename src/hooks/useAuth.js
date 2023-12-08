import { useState, useEffect } from 'react';
import { auth } from '../Configure/firebaseConfig';
import { createUserWithEmailAndPassword,   onAuthStateChanged} from "firebase/auth";
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
        console.log(email, password);
        await createUserWithEmailAndPassword(auth, email, password);
        const { setUserProfile } = useFirestore();
        await setUserProfile({email, password});
    };
      

   
    return { user, signUp };
};

export default useAuth;
