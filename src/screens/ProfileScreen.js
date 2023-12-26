import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import useFirestore from '../hooks/useFirestore';
import { Button } from 'react-native-elements';
import useAuth from "../hooks/useAuth";
const UserProfileScreen = ({ navigation }) => {
  const [viewMode, setViewMode] = useState('pickups'); 
  const { currentUser,signOutUser } = useAuth();
  const { getUserPickups } = useFirestore();
  const [previousPickups, setPreviousPickups] = useState([]);

  // useEffect(() => {
  //   if (currentUser) {
  //     getUserPickups(currentUser.uid).then(pickups => {
  //       setPreviousPickups(pickups);
  //     }).catch(error => {
  //       console.error("Error fetching pickups: ", error);
  //       // Optionally handle the error, e.g., show an alert
  //     });
  //   }
  // }, [currentUser, getUserPickups]);

  const { getUserFeedback } = useFirestore();
  const [userFeedback, setUserFeedback] = useState([]);

  useEffect(() => {
    if (currentUser) {
      if (viewMode === 'pickups') {
        getUserPickups(currentUser.uid).then(pickups => {
          setPreviousPickups(pickups);
        });
      } else if (viewMode === 'feedback') {
        getUserFeedback(currentUser.uid).then(feedback => {
          setUserFeedback(feedback);
        });
      }
    }
  }, [currentUser, viewMode, getUserPickups, getUserFeedback]);

  const renderItem = ({ item }) => (
    
    <View style={styles.orderItem}>
      
      <Text style={styles.orderService}>{item.serviceName}</Text>
      <Text style={styles.orderTotal}>Date: {item.pickupDate}</Text>
      <Text style={styles.orderTotal}>Total Price: {item.totalPrice}</Text>
      <Text style={styles.orderTotal}>Time: {item.pickupTime}</Text>
      <Text style={styles.orderTotal}>No of Clothes: {item.numberOfClothes}</Text>

    </View>
  );

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackText}>{item.feedback}</Text>
      <Text style={styles.feedbackDate}>Date: {item.timestamp.toDate().toDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {currentUser && (
        <View>
          <Text style={styles.userInfo}>Email: {currentUser.email}</Text>
        </View>
      )}


      {/* <FlatList
        data={previousPickups}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      /> */}

<View style={styles.toggleButtons}>
  <Button
    title="Pickups"
    onPress={() => setViewMode('pickups')}
    buttonStyle={[styles.toggleButton, viewMode === 'pickups' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
    titleStyle={styles.toggleButtonText}
  />
  <Button
    title="Feedback"
    onPress={() => setViewMode('feedback')}
    buttonStyle={[styles.toggleButton, viewMode === 'feedback' ? styles.toggleButtonSelected : styles.toggleButtonUnselected]}
    titleStyle={styles.toggleButtonText}
  />
</View>

      {viewMode === 'pickups' ? (
        
        <FlatList
        
          data={previousPickups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <FlatList
          data={userFeedback}
          keyExtractor={(item) => item.id}
          renderItem={renderFeedbackItem}
        />
      )}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Button
            title='Logout'
            onPress={() => {
              signOutUser();
            }}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({

  feedbackItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  feedbackText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  feedbackDate: {
    fontSize: 14,
    color: "#666",
    textAlign: 'right',
  },
  toggleButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  toggleButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButtonSelected: {
    backgroundColor: '#953553',
  },
  toggleButtonUnselected: {
    backgroundColor: '#ccc',
  },    
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#953553",
    marginVertical: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  userInfo: {
    fontSize: 20,
    textAlign: "center",
    color: "#333",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ordersTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  orderItem: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#ccc",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderService: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#953553",
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333",
  },
});
export default UserProfileScreen;