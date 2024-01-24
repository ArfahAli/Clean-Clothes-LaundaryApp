import { doc, setDoc, getDoc, getDocs, query, collection, where, deleteDoc } from "firebase/firestore";
import { firestore } from "../Configure/firebaseConfig";
import { useState } from "react";
import { Alert } from 'react-native';
import { addDoc } from "firebase/firestore";

const useFirestore = () => {
    const [loading, setLoading] = useState(false);

    const setUserProfile = async (userId, profileData) => {
        try {
          const userProfileRef = doc(firestore, 'users', userId);
          await setDoc(userProfileRef, profileData);
          console.log("User profile set successfully");
        } catch (error) {
          console.error("Error setting user profile: ", error.message);
        }
      };
      const getAllUserProfiles = async () => {
        const querySnapshot = await getDocs(collection(firestore, 'users'));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      };
      

    const getUserProfile = async (userId) => {
        const userProfileRef = doc(firestore, 'users', userId);
        const docSnap = await getDoc(userProfileRef);
        return docSnap.exists() ? docSnap.data() : null;
    };

    const deleteUserProfile = async (userId) => {
        const userProfileRef = doc(firestore, 'users', userId);
        await deleteDoc(userProfileRef);
    };

    const emailExists = async (email) => {
        setLoading(true);
        const q = query(collection(firestore, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        setLoading(false);
        return querySnapshot.docs.length > 0;
    };

    const userExsists = async (username) => {
        setLoading(true);
        const q = query(collection(firestore, 'users'), where('username', '==', username));
        const querySnapshot = await getDocs(q);
        setLoading(false);
        return querySnapshot.docs.length > 0;
    };
    const addPickupDetails = async (userId, pickupDetails) => {
      try {
        const pickupCollectionRef = collection(firestore, 'users', userId, 'pickups');
        await addDoc(pickupCollectionRef, pickupDetails);
        console.log("Pickup details added successfully");
      } catch (error) {
        console.error("Error adding pickup details: ", error.message);
      }
    };
    const getUserPickups = async (userId) => {
      setLoading(true);
      const pickupsRef = collection(firestore, 'users', userId, 'pickups');
      const querySnapshot = await getDocs(pickupsRef);
      setLoading(false);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  };
  const getAllUserPickups = async () => {
    setLoading(true);
    const allPickups = [];
    const usersSnapshot = await getDocs(collection(firestore, 'users'));
    
    for (const userDoc of usersSnapshot.docs) {
      const pickupsSnapshot = await getDocs(collection(firestore, 'users', userDoc.id, 'pickups'));
      pickupsSnapshot.forEach(doc => {
        allPickups.push({ userId: userDoc.id, ...doc.data(), id: doc.id });
      });
    }
  
    setLoading(false);
    return allPickups;
  };
  
  const addFeedbackDetails = async (userId, feedbackDetails) => {
    try {
      const feedbackCollectionRef = collection(firestore, 'users', userId, 'feedback');
      await addDoc(feedbackCollectionRef, feedbackDetails);
      console.log("Feedback details added successfully");
    } catch (error) {
      console.error("Error adding feedback details: ", error.message);
      throw error;  // Throw the error so it can be handled in the component
    }
  };

  const getUserFeedback = async (userId) => {
    setLoading(true);
    const feedbackRef = collection(firestore, 'users', userId, 'feedback');
    try {
      const querySnapshot = await getDocs(feedbackRef);
      setLoading(false);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching user feedback: ", error);
      setLoading(false);
      throw error;
    }
  };
  
  //Admin Functions
  const addService = async (serviceData) => {
    try {
      await addDoc(collection(firestore, 'services'), serviceData);
      console.log('Service added successfully');
    } catch (error) {
      console.error('Error adding service: ', error);
      throw error;
    }
  };
      
 const getServices = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, 'services'));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching services: ', error);
      throw error;
    }
  };

  const updateService = async (serviceId, serviceData) => {
    try {
      const serviceRef = doc(firestore, 'services', serviceId);
      await updateDoc(serviceRef, serviceData);
    } catch (error) {
      console.error('Error updating service: ', error);
      throw error;
    }
  };

  const deleteService = async (serviceId) => {
    try {
      const serviceRef = doc(firestore, 'services', serviceId);
      await deleteDoc(serviceRef);
    } catch (error) {
      console.error('Error deleting service: ', error);
      throw error;
    }
  };


    return { setUserProfile, getUserProfile, deleteUserProfile,userExsists, emailExists, addPickupDetails, getUserPickups,getAllUserPickups, addFeedbackDetails,getUserFeedback,loading,addService, getServices, updateService, deleteService, getAllUserProfiles };
};

export default useFirestore;
