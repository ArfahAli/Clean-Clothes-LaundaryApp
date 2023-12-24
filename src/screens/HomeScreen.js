import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, FAB } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  // Function to handle service selection
  const handleServiceSelect = (service) => {
    console.log(`Selected Service: ${service}`);
    // Here you can navigate to the service detail screen
  };

  // Function to handle pickup scheduling
  const handleSchedulePickup = () => {
    console.log('Schedule Pickup');
    // Here you can navigate to the scheduling screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.welcomeText}>Welcome back Samantha Martin</Text>
        <View style={styles.cardContainer}>
          <TouchableOpacity onPress={() => handleServiceSelect('Wash & Iron')}>
            <Card style={styles.card}>
              <Card.Cover source={require('../../assets/images/washing.png')} />
              <Card.Title title="Wash & Iron" />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleServiceSelect('Ironing')}>
            <Card style={styles.card}>
              <Card.Cover source={require('../../assets/images/iron.png')} />
              <Card.Title title="Ironing" />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleServiceSelect('Dry Cleaning')}>
            <Card style={styles.card}>
              <Card.Cover source={require('../../assets/images/dry_cleaning.jpg')} />
              <Card.Title title="Ironing" />
            </Card>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleServiceSelect('Darning')}>
            <Card style={styles.card}>
              <Card.Cover source={require('../../assets/images/darning.png')} />
              <Card.Title title="Ironing" />
            </Card>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        large
        icon="plus"
        onPress={handleSchedulePickup}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  card: {
    width: '48%', // Two cards per row
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
