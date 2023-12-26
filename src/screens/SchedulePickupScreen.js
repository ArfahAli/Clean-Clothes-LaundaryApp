import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import useFirestore from '../hooks/useFirestore';
import { AuthContext } from '../../contexts/AuthContext';
import useAuth from '../hooks/useAuth';
import { addDoc } from 'firebase/firestore';
const SchedulePickupScreen = ({ route, navigation }) => {
    const [serviceName, setServiceName] = useState('');
    const [pickupDate, setPickupDate] = useState('');
    const [pickupTime, setPickupTime] = useState('');
    const [numberOfClothes, setNumberOfClothes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
  
    const { addPickupDetails } = useFirestore();
    const { currentUser } = useAuth();
  
    const pricePerCloth = 5; // Static price per cloth
  
    useEffect(() => {
      // Calculate total price whenever the number of clothes changes
      calculateTotalPrice(numberOfClothes);
    }, [numberOfClothes]);
  
    const calculateTotalPrice = (quantity) => {
      const total = parseInt(quantity, 10) * pricePerCloth;
      setTotalPrice(isNaN(total) ? 0 : total); // Update total price
    };
  
    const validateInputs = () => {
      return serviceName && pickupDate && pickupTime && numberOfClothes;
    };
  
    const handleProceedToCheckout = async () => {
        if (validateInputs()) {
            if (currentUser) {
              try {
                await addPickupDetails(currentUser.uid, {
                  serviceName, pickupDate, pickupTime, numberOfClothes, totalPrice
                });
                navigation.navigate('SuccessScreen', {
                  serviceName,
                  pickupDate,
                  pickupTime,
                  numberOfClothes,
                  totalPrice,
                });
              } catch (error) {
                console.error("Error saving pickup details: ", error);
                // Optionally show an alert or a message to the user
              }
            } else {
              // Handle the case when user is not authenticated
              console.log('User not authenticated');
            }
          } else {
            alert('Please fill in all fields correctly.');
          }
        };

  return (
    <ImageBackground source={require('../../assets/back.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Schedule Pickup</Text>
          <TextInput
            style={styles.input}
            placeholder="Service Name"
            value={serviceName}
            onChangeText={(text) => setServiceName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pickup Date"
            value={pickupDate}
            onChangeText={(text) => setPickupDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Pickup Time"
            value={pickupTime}
            onChangeText={(text) => setPickupTime(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Number of Clothes"
            keyboardType="numeric"
            value={numberOfClothes}
            onChangeText={(text) => setNumberOfClothes(text)}
          />
          <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToCheckout}>
            <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({

    totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#953553',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#953553',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  proceedButton: {
    backgroundColor: '#953553',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SchedulePickupScreen;
