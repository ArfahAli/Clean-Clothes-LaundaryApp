import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import useFirestore from '../hooks/useFirestore';

const ManageServicesScreen = ({ navigation }) => {
    const [services, setServices] = useState([]);
    const { getServices, deleteService } = useFirestore();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await getServices();
                setServices(fetchedServices);
            } catch (error) {
                console.error('Error fetching services: ', error);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (serviceId) => {
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this service?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', 
                    onPress: async () => {
                        try {
                            await deleteService(serviceId);
                            setServices(services.filter(service => service.id !== serviceId));
                        } catch (error) {
                            console.error('Error deleting service: ', error);
                        }
                    }
                },
            ]
        );
    };

    const handleEdit = (service) => {
        // Navigate to an edit screen, passing the selected service's details
        navigation.navigate('EditServiceScreen', { service });
    };
    const renderItem = ({ item }) => (
        <View style={styles.serviceItem}>
            <Text style={styles.serviceText}>{item.name}</Text>
            {/* Include other service details as needed */}
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={services}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F0F3F4',
    },
    serviceItem: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    serviceText: {
        fontSize: 16,
    },
    editButton: {
        backgroundColor: '#953553',
        padding: 5,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        marginLeft: 10,
    },
    // ... Add other styles as needed
});

export default ManageServicesScreen;
