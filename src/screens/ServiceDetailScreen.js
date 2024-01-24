import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import useFirestore from '../hooks/useFirestore';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { getServices } = useFirestore();
  const { service } = route.params;


  const handleScheduleService = () => {
    navigation.navigate('SchedulePickupScreen', { service });
  };

  if (!service) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  // Assuming service has these details
  const { imageUrl, name, description, price, deliveryTime, schedule, specialOffer } = service;

  return (
    <View style={styles.container}>
      <Text style={styles.serviceName}>{name}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Price:</Text>
        <Text style={styles.detailValue}>{price}</Text>
        <Text style={styles.detailLabel}>Delivery Time:</Text>
        <Text style={styles.detailValue}>{deliveryTime}</Text>
        <Text style={styles.detailLabel}>Schedule</Text>
        <Text style={styles.detailValue}>{schedule}</Text>
        <Text style={styles.detailLabel}>Special Offer:</Text>
        <Text style={styles.detailValue}>{specialOffer}</Text>
        {/* Repeat for other details... */}

       
      </View>

      <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleService}>
        <Text style={styles.scheduleButtonText}>Schedule Service</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#953553',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#953553',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  reviewComment: {
    fontSize: 16,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#953553',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServiceDetailScreen;
