import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/back.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Icon name="check-circle" size={100} color="#953553" />
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.message}>Your order will be processed shortly.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#953553',
  },
  message: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
});

export default SuccessScreen;
