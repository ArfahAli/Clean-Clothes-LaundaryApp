import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import useFirestore from '../hooks/useFirestore';

const EditServiceScreen = ({ route, navigation }) => {
    const { service } = route.params;
    const [serviceName, setServiceName] = useState(service.name);
    const [serviceDescription, setServiceDescription] = useState(service.description);
    const [servicePrice, setServicePrice] = useState(service.price);
    const [deliveryTime, setDeliveryTime] = useState(service.deliveryTime);
    const [schedule, setSchedule] = useState(service.schedule);
    const [specialOffer, setSpecialOffer] = useState(service.specialOffer);
    // Add image state if handling images

    const { updateService } = useFirestore();

    const handleUpdateService = async () => {
        if (!serviceName || !serviceDescription || !servicePrice) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        try {
            await updateService(service.id, {
                name: serviceName,
                description: serviceDescription,
                price: servicePrice,
                deliveryTime,
                schedule,
                specialOffer,
                // Add image handling if applicable
            });
            Alert.alert('Success', 'Service updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating service: ', error);
            Alert.alert('Error', 'Failed to update service.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Edit Service</Text>
            <TextInput
                style={styles.input}
                placeholder="Service Name"
                value={serviceName}
                onChangeText={setServiceName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={serviceDescription}
                onChangeText={setServiceDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={servicePrice}
                onChangeText={setServicePrice}
            />
            <TextInput
                style={styles.input}
                placeholder="Delivery Time"
                value={deliveryTime}
                onChangeText={setDeliveryTime}
            />
            <TextInput
                style={styles.input}
                placeholder="Schedule"
                value={schedule}
                onChangeText={setSchedule}
            />
            <TextInput
                style={styles.input}
                placeholder="Special Offer"
                value={specialOffer}
                onChangeText={setSpecialOffer}
            />
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdateService}>
                <Text style={styles.updateButtonText}>Update Service</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F0F3F4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#34495E',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
    },
    updateButton: {
        backgroundColor: '#34495E',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    updateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Add other styles as needed
});

export default EditServiceScreen;
