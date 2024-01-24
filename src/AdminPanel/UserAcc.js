import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import useFirestore from '../hooks/useFirestore';
import { useNavigation } from '@react-navigation/native';

const UserAcc = () => {
  const [userProfiles, setUserProfiles] = useState([]);
  const { getAllUserProfiles, deleteUserProfile } = useFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserProfiles = async () => {
      const profiles = await getAllUserProfiles();
      setUserProfiles(profiles);
    };

    fetchUserProfiles();
  }, []);

  const handleDeleteUser = async (userId) => {
    await deleteUserProfile(userId);
    setUserProfiles(userProfiles.filter(user => user.id !== userId));
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.title}>All User Accounts</Text>
        {userProfiles.map(user => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.cardText}>Username: {user.username}</Text>
            <Text style={styles.cardText}>Email: {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleDeleteUser(user.id)}>
              <Text style={styles.buttonText}>Delete User</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminHomeScreen')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F0F3F4',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#483248',
  },
  card: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#953553',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default UserAcc;
