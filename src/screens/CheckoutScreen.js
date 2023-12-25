import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';

const CheckoutScreen = ({ route, navigation }) => {
  const { service, pickupDate, pickupTime, numberOfClothes } = route.params;

  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to add an item to the checkout
  const addItemToCheckout = () => {
    const newItem = {
      id: items.length + 1,
      name: service.name,
      quantity: parseInt(numberOfClothes, 10),
      price: 10.00, // You can change this based on your pricing logic
    };

    setItems([...items, newItem]);
    setTotalAmount(totalAmount + newItem.quantity * newItem.price);
  };

  return (
    <View style={styles.container}>
      <Image
          source={require('../../assets/back.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Checkout</Text>

        {/* Display items in the checkout */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text>{item.name}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Text>Price: ${item.price.toFixed(2)}</Text>
            </View>
          )}
        />

        <Text style={styles.totalAmount}>Total Amount: ${totalAmount.toFixed(2)}</Text>

        {/* Place order button */}
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            // Implement logic to add the order to the database
            // and show the success message
            navigation.navigate('SuccessScreen');
          }}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  itemContainer: {
    marginBottom: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  placeOrderButton: {
    backgroundColor: '#953553',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckoutScreen;
