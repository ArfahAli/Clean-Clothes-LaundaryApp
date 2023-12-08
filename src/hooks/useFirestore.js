import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../Configure/firebaseConfig";
const useFirestore = () => {

    const setUserProfile = async(user)=>{
        const UserRef = doc(firestore, 'users', user.email);
        await setDoc(UserRef, user);
    }

    return {setUserProfile};
};
export default useFirestore;