import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../Configure/firebaseConfig';
import useFirestore from '../hooks/useFirestore';
import useAuth from '../hooks/useAuth';

const FeedbackScreen = () => {
  const { currentUser } = useAuth();
  const { addFeedbackDetails } = useFirestore();
  const navigation = useNavigation();
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = async () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }

    if (!currentUser || !currentUser.uid) {
      Alert.alert('Error', 'You must be logged in to submit feedback.');
      return;
    }

    try {
      await addFeedbackDetails(currentUser.uid, {
        feedback: feedback,
        timestamp: serverTimestamp(),
      });

      Alert.alert('Success', 'Thank you for your feedback!');
      setFeedback('');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error adding feedback to Firestore:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again later.');
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/back.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Feedback Screen</Text>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Enter your feedback..."
          placeholderTextColor="#999" 
          multiline
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
          textAlignVertical="top" 
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  feedbackInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#953553',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
