import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from "../screens/ProfileScreen";
import useAuth from '../hooks/useAuth';
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Button,
    TouchableOpacity,

} from "react-native";
// import { Avatar } from "react-native-elements";
// Correct import statement for version 4.x
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
const Stack = createStackNavigator();
const UserNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeScreen'>
                <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default UserNav;
