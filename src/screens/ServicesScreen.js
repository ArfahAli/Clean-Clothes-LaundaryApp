import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFirestore from '../hooks/useFirestore'; // Ensure the path is correct

const ServicesScreen = () => {
  const [services, setServices] = useState([]);
  const navigation = useNavigation();
  const { getServices } = useFirestore(); // Destructuring getServices from useFirestore

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await getServices(); // Using getServices from the custom hook
        setServices(fetchedServices);
      } catch (error) {
        console.error('Error fetching services: ', error);
      }
    };

    loadServices();
  }, [getServices]);
  const navigateToServiceDetail = (service) => {
    navigation.navigate('ServiceDetail', { service }); // Passing the entire service object
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => navigateToServiceDetail(item)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.serviceImage} />
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#483248',
  },
  serviceItem: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
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
  },
});

export default ServicesScreen;
