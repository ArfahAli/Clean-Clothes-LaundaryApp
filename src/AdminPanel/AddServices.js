import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import useFirestore from '../hooks/useFirestore';

const AddServiceScreen = ({ navigation }) => {
    const [serviceName, setServiceName] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [servicePrice, setServicePrice] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('');
    const [schedule, setSchedule] = useState('');
    const [specialOffer, setSpecialOffer] = useState('');
    const [imageUri, setImageUri] = useState(null);
    const [uploading, setUploading] = useState(false);

    const { addService } = useFirestore();

    const handleChooseImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.uri);
        }
    };

    const uploadImage = async () => {
        if (!imageUri) {
            return null;
        }

        setUploading(true);
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const storageRef = ref(getStorage(), `services/${new Date().getTime()}`);
        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        setUploading(false);
        return downloadURL;
    };

    const handleAddService = async () => {
        if (!serviceName || !serviceDescription || !servicePrice || !imageUri) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        try {
            const imageUrl = await uploadImage();
            await addService({
                name: serviceName,
                description: serviceDescription,
                price: servicePrice,
                deliveryTime,
                schedule,
                specialOffer,
                imageUrl,
            });
            Alert.alert('Success', 'Service added successfully!');
            // Reset form or navigate to another screen
        } catch (error) {
            console.error('Error adding service: ', error);
            Alert.alert('Error', 'Failed to add service.');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Add New Service</Text>
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
                placeholder="Schedule (e.g., Mon - Fri, 9 AM - 5 PM)"
                value={schedule}
                onChangeText={setSchedule}
            />
            <TextInput
                style={styles.input}
                placeholder="Special Offer"
                value={specialOffer}
                onChangeText={setSpecialOffer}
            />
            <TouchableOpacity style={styles.imagePickerButton} onPress={handleChooseImage}>
                <Text style={styles.imagePickerText}>Select Image</Text>
            </TouchableOpacity>

            {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
            {uploading && <Text>Uploading Image...</Text>}




            <TouchableOpacity
                style={[styles.addButton, { opacity: uploading ? 0.5 : 1 }]}
                onPress={handleAddService}
                disabled={uploading}
            >
                <Text style={styles.addButtonText}>Add Service</Text>
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
    addButton: {
        backgroundColor: '#34495E',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AddServiceScreen;
