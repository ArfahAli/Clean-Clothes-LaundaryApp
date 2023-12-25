import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const SchedulePickupScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [numberOfClothes, setNumberOfClothes] = useState('');

  const handleProceedToCheckout = () => {
    // Validate pickup details (you can add your validation logic here)

    // Navigate to the checkout screen
    navigation.navigate('CheckoutScreen', {
      service,
      pickupDate,
      pickupTime,
      numberOfClothes,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/back.jpg')} 
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Schedule Pickup</Text>
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
          <TouchableOpacity style={styles.proceedButton} onPress={handleProceedToCheckout}>
            <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
