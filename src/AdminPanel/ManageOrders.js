import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import useFirestore from '../hooks/useFirestore';
import { useNavigation } from '@react-navigation/native';

const ManageOrders = () => {
    const [pickups, setPickups] = useState([]);
    const { getAllUserPickups, updatePickup } = useFirestore();
    const navigation = useNavigation();
    useEffect(() => {
        const fetchPickups = async () => {
            try {
                const fetchedPickups = await getAllUserPickups();
                setPickups(fetchedPickups);
            } catch (error) {
                console.error('Error fetching all pickups: ', error);
            }
        };

        fetchPickups();
    }, []);

    const handleDeliveryStatus = async (pickupId, delivered) => {
        try {
            await updatePickup(pickupId, { delivered: !delivered });
            setPickups(pickups.map(pickup => pickup.id === pickupId ? { ...pickup, delivered: !delivered } : pickup));
        } catch (error) {
            console.error('Error updating pickup: ', error);
        }
    };
    const renderItem = ({ item }) => {
        console.log('Rendering item:', item);  // Debug log
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}>User ID: {item.userId}</Text>
                <Text style={styles.cardText}>Pickup Time: {item.pickupTime}</Text>
                <Text style={styles.cardText}>Pickup Date: {item.pickupDate}</Text>
                <Text style={styles.cardText}>Number of Clothes: {item.numberOfClothes}</Text>
                <Text style={styles.cardText}>Total Price: ${item.totalPrice}</Text>

                <TouchableOpacity 
                    style={[styles.button, item.delivered ? styles.deliveredButton : styles.undeliveredButton]} 
                    onPress={() => handleDeliveryStatus(item.id, item.delivered)}
                >
                    <Text style={styles.buttonText}>{item.delivered ? 'Delivered' : 'Mark as Delivered'}</Text>
                </TouchableOpacity>
            </View>
        );
    };
    

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Manage Orders</Text>
                <FlatList
                    data={pickups}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}  // Make sure each item has an 'id'
                />
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminHomeScreen')}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
    
};
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