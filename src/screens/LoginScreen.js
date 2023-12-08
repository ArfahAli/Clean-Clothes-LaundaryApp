import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';

const LoginComponent = ({ navigation }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const { Login, loading, user } = useAuth();

const validateForm = () => {
  let newErrors = {};
    if (formData.email.includes(' ') || formData.email.length < 3) {
      newErrors.email = 'Username must be at least 3 characters long with no spaces';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleLogin = async () => {
  if(validateForm())
  {
    console.log('Form Data:', formData);
    await Login(formData.email, formData.password);
    if (user) {
      // Assuming you have navigation prop available
      navigation.navigate('UserNav');
    } else {
      // Handle unsuccessful login
      setErrors({ email: 'Invalid credentials' });
    }

    
  }  
  
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome-img.jpg')}
        style={styles.logo}
      />

      <Text style={styles.companyName}>Login Here</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
              value={formData.password}
      />
      <TouchableOpacity style={styles.loginButton} onPress={()=>handleLogin()}>
        <Text style={styles.loginButtonText}>Login</Text>
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
    backgroundColor: '#DC8686',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#702963',
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
    color: '#DC143C',
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