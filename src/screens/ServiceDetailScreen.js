import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;

  const additionalDetails = {
    price: '$10.00',
    deliveryTime: '2-3 working days',
    schedule: 'Mon - Fri, 9:00 AM - 5:00 PM',
    specialOffer: 'Get 10% off on your first order!',
    customerReviews: [
      { id: '1', rating: 4.5, comment: 'Excellent service! Highly recommended.' },
      { id: '2', rating: 5, comment: 'Quick and efficient. Will use again.' },
    ],
  };

  const handleScheduleService = () => {
    // Implement your logic to navigate to the scheduling screen
    // For example, if your scheduling screen is named 'SchedulePickupScreen'
    navigation.navigate('SchedulePickupScreen', { service });
  };

  return (
    <View style={styles.container}>
      <Image source={service.image} style={styles.serviceImage} />
      <Text style={styles.serviceName}>{service.name}</Text>
      <Text style={styles.serviceDescription}>{service.description}</Text>

      {/* Additional details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Price:</Text>
        <Text style={styles.detailValue}>{additionalDetails.price}</Text>

        <Text style={styles.detailLabel}>Delivery Time:</Text>
        <Text style={styles.detailValue}>{additionalDetails.deliveryTime}</Text>

        <Text style={styles.detailLabel}>Schedule:</Text>
        <Text style={styles.detailValue}>{additionalDetails.schedule}</Text>

        <Text style={styles.detailLabel}>Special Offer:</Text>
        <Text style={styles.detailValue}>{additionalDetails.specialOffer}</Text>

        <Text style={styles.detailLabel}>Customer Reviews:</Text>
        {additionalDetails.customerReviews.map((review) => (
          <View key={review.id} style={styles.reviewContainer}>
            <Icon name="star" size={16} color="#953553" style={styles.starIcon} />
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        ))}
      </View>

      {/* Schedule service button */}
      <TouchableOpacity style={styles.scheduleButton} onPress={handleScheduleService}>
        <Text style={styles.scheduleButtonText}>Schedule Service</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  serviceImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#953553',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#953553',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starIcon: {
    marginRight: 4,
  },
  reviewComment: {
    fontSize: 16,
    color: '#333',
  },
  scheduleButton: {
    backgroundColor: '#953553',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  scheduleButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServiceDetailScreen;
