// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen"
import LoginScreen from '../screens/LoginScreen'; // Import your LoginScreen
import RegisterScreen from '../screens/RegisterScreen'; // Import your RegisterScreen
const Stack = createStackNavigator();

const AuthNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNav;


  
