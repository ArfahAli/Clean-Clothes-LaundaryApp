import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import useAuth from '../hooks/useAuth';
import { Alert } from 'react-native';

const LoginComponent = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { Login, loading } = useAuth(); // useAuth hook

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email.includes('@') || formData.email.length < 3) {
      newErrors.email = 'Please enter a valid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
        try {
            await Login(formData.email, formData.password); // Attempt to login
        } catch (error) {
            console.log(error.message); // Log the error message
            Alert.alert("Incorrect credentials"); // Display an alert with the error
        }
    }
};


  return (
    <View style={styles.container}>
            <Text style={styles.appName}>Clean Clothes</Text>

      <Image source={require('../../assets/display.png')} style={styles.logo} />

      <Text style={styles.companyName}>Login Here</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        value={formData.password}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.switchText} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register here.
      </Text>
      <Text style={styles.switchText}>Or continue with</Text>
      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require('../../assets/twitter.png')} style={styles.socialIcon} />
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  appName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#702963',
    position: 'absolute',
    zIndex: 1,
    top: 15, // Adjust as needed
    textAlign: 'center',
    width: '100%',
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10
  },
  loginButton: {
    backgroundColor: '#953553',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
   companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color:'#702963',
    marginBottom : 30
  },
  switchText: {
    marginTop: 20,
    color: '#953553',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default LoginComponent;