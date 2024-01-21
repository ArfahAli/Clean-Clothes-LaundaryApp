import react, { Component } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ManageOrders = () => {
    const navigation = useNavigation();
    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.title}>Manage Orders</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminHomeScreen')}>
            <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F3F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFA07A',
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default ManageOrders;