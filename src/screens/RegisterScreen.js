import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import useAuth from '../hooks/useAuth';
const RegisterComponent = ({ navigation }) => {
 
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const validateForm = () => {
    let newErrors = {};

    // Username validation
    if (formData.username.includes(' ') || formData.username.length < 3) {
      newErrors.username =
        'Username must be at least 3 characters long with no spaces';
    }

    // Email validation (basic example)
    if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 

  const handleRegister = async () => {
    if (validateForm()) {
        setLoading(true);
        const result = await signUp(formData.email, formData.password);
        setLoading(false);

        if (result.success) {
            // Navigate to another screen or show success message
            console.log("Registration successful");
        } else {
            setErrors({ ...errors, email: result.message });
        }
    }
};

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/welcome-img.jpg')}
        style={styles.logo}
      />

         <Text style={styles.companyName}>Create Acount</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) =>
          setFormData({ ...formData, username: text })
        }
        value={formData.username}
      />
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
        onChangeText={(text) =>
          setFormData({ ...formData, password: text })
        }        value={formData.password}
        />
      <TouchableOpacity style={styles.registerButton} onPress={()=>handleRegister()}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.switchText} onPress={()=> navigation.navigate('Login')}>
        Already have an account? Login here.
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
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: '#DC8686',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#702963',
    fontSize: 18,
  },
  switchText: {
    marginTop: 20,
    color: '#722F37',
  },
   companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color:'#702963',
     marginBottom : 30
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

export default RegisterComponent;
