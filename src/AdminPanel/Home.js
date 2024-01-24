import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableHighlight, ScrollView } from "react-native";

const AdminHomeScreen = ({ navigation }) => {
  const [hoveredBox, setHoveredBox] = useState(null);

  const boxesData = [
    {
      id: '1',
      name: 'Add Services',
      image: require('../../assets/add_service_icon.png'), // Replace with appropriate image
      screen: 'AddServiceScreen',
      description: 'Add new laundry services.',
    },
    {
      id: '2',
      name: 'Manage Services',
      image: require('../../assets/manage_services_icon.png'), // Replace with appropriate image
      screen: 'ManageServicesScreen',
      description: 'Update or delete existing services.',
    },
    {
      id: '3',
      name: 'View Orders',
      image: require('../../assets/orders_icon.png'), // Replace with appropriate image
      screen: 'ManageOrders',
      description: 'View and manage all orders.',
    },
    {
      id: '4',
      name: 'User Accounts',
      image: require('../../assets/user_accounts_icon.png'), // Replace with appropriate image
      screen: 'UserAcc',
      description: 'Create, view, and manage user accounts.',
    },
  ];

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  
  const renderBox = ({ item }) => (
    <TouchableHighlight
      key={item.id}  // Add this line
      style={[styles.box, item.id === hoveredBox && styles.hoveredBox]}
      underlayColor="#E6E6FA"
      onPress={() => navigateToScreen(item.screen)}
      onHideUnderlay={() => setHoveredBox(null)}
      onShowUnderlay={() => setHoveredBox(item.id)}
    >
      <>
        <Image source={item.image} style={styles.boxImage} />
        <Text style={styles.boxText}>{item.name}</Text>
        <Text style={styles.Description}>{item.description}</Text>
      </>
    </TouchableHighlight>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={require("../../assets/back.jpg")} style={styles.coverImage} /> 
        <Text style={styles.welcomeText}>Admin Dashboard</Text>
        <View style={styles.boxContainer}>
          {boxesData.map((item) => renderBox({ item }))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#F0F3F4', // Light background for a professional look
    },
    coverImage: {
      width: '100%',
      height: 250, // Adjusted height
      resizeMode: 'cover',
      marginBottom: 20,
    },
    welcomeText: {
      fontSize: 28, // Slightly reduced font size
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#34495E', // Dark shade for text
    },
    boxContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10, // Added padding
    },
    box: {
      width: '45%', // Adjust width for better fit
      backgroundColor: '#EAECEE', // Light grey box background
      borderRadius: 10, // Slightly increased border radius
      padding: 15, // Increased padding
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#ABB2B9', // Soft border color
      alignItems: 'center', // Center content horizontally
    },
    hoveredBox: {
      backgroundColor: '#D5DBDB', // Slightly darker for hover effect
    },
    boxImage: {
      width: 120, // Fixed width for uniformity
      height: 120, // Fixed height for uniformity
      borderRadius: 10,
      marginBottom: 10,
    },
    boxText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#1B4F72', // Dark blue for headings
    },
    Description: {
      fontSize: 14,
      textAlign: 'center',
      color: '#626567', // Soft color for descriptions
    },
  });
export default AdminHomeScreen;  