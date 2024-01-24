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
        navigation.navigate('EditServiceScreen', { service });
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
                    <Text style={styles.title}>All Services</Text>

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
        backgroundColor: '#F0F3F4',
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    cardText: {
        fontSize: 16,
        color: '#333',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#483248',
        marginLeft: 140,
        marginTop: 20,
      },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#953553',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // ... Add other styles as needed
});

export default ManageServicesScreen;
