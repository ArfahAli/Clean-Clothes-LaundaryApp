// ServicesScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServicesScreen = () => {
  const navigation = useNavigation();

  const servicesData = [
    {
      id: '1',
      name: 'Wash and Fold',
      description: 'Convenient and hassle-free laundry service for everyday clothes.',
      image: require('../../assets/wash_and_fold.jpg'),
    },
    {
      id: '2',
      name: 'Dry Cleaning',
      description: 'Specialized cleaning for delicate or dry-clean-only garments.',
      image: require('../../assets/dry_cleaning.png'),
    },
    {
      id: '3',
      name: 'Ironing/Pressing',
      description: 'Professional ironing and pressing services to keep your clothes crisp.',
      image: require('../../assets/ironing_pressing.jpg'),
    },
  ];

  const navigateToServiceDetail = (service) => {
    navigation.navigate('ServiceDetail', { service });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => navigateToServiceDetail(item)}
    >
      <Image source={item.image} style={styles.serviceImage} />
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Services</Text>

      <FlatList
        data={servicesData}
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
