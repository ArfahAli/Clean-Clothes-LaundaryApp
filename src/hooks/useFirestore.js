import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "../Configure/firebaseConfig";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
const useFirestore = () => {

    const setUserProfile = async(user)=>{
        const UserRef = doc(firestore, 'users', user.email);
        await setDoc(UserRef, user);
    }

    const getUserProfile = async(user)=>{
        const UserRef = doc(firestore, 'users', user.email);
        const snapshot = await getDoc(UserRef);
        return snapshot.exists() ? snapshot.data() : null;

    }
    const emailExists = async (email) => {
        console.log('API HIT');
        const q = query(collection(firestore, 'users'), where('email', '==', email));
    
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.length > 0 ? true : false;
    };
    

    const userExsists = async (username) => {
        const q = query(collection(firestore, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        console.log('API HIT')
        return querySnapshot.docs.length > 0 ? true : false;
    };

    return {setUserProfile, getUserProfile, userExsists, emailExists};
};
export default useFirestore;