import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServicesScreen";
import FeedbackScreen from "../screens/FeedbackScreen";
import FAQScreen from "../screens/FaqScreen";
import ServiceDetailScreen from "../screens/ServiceDetailScreen";
import UserProfileScreen from "../screens/ProfileScreen";
import SchedulePickupScreen from "../screens/SchedulePickupScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import SuccessScreen from "../screens/SuccessScreen";
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
const Stack = createStackNavigator();
const UserNav = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeScreen'>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="FAQScreen" component={FAQScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="ProfileScreen" component={UserProfileScreen} />
        <Stack.Screen name="SchedulePickupScreen" component={SchedulePickupScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default UserNav;
