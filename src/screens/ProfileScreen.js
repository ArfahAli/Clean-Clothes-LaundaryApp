// import useAuth from '../hooks/useAuth';
// import React from "react";
// import {
//     StyleSheet,
//     Text,
//     View,
//     SafeAreaView,
//     Image,
//     ScrollView,
//     Button,
//     TouchableOpacity,

// } from "react-native";
// // import { Avatar } from "react-native-elements";
// // Correct import statement for version 4.x
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// const ProfileScreen = () => {
//     const { signOutUser } = useAuth();
//     const { user } = useAuth();
//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={styles.titleBar}>
//                     <Ionicons name="ios-arrow-back" size={24} color="#FFC0CB"></Ionicons>
//                 </View>

//                 <View style={{ alignSelf: "center" }}>
//                     <View style={styles.profileImage}>
//                         <View style={styles.profileImage}>
//                             <TouchableOpacity>
                                
//                             </TouchableOpacity>
//                             {/* <Avatar
//                                 size={200}
//                                 rounded
//                                 icon={{ name: 'user', type: 'font-awesome' }}
//                                 onPress={() => console.log("Works!")}
//                                 activeOpacity={0.7}
//                                 containerStyle={{ flex: 2, marginLeft: 20, marginTop: 115 }}
//                             /> */}
//                         </View>
//                         {/* <Image
//                             source={require("../../assets/profile.jpg")}
//                             style={styles.image}
//                             resizeMode="center"
//                         /> */}
//                     </View>
//                     <View style={styles.dm}>
//                        <MaterialIcons
//                             name="chat"
//                             size={18}
//                             color="purple"
//                         ></MaterialIcons>
//                     </View>
//                     <View style={styles.active}></View>
//                     <View style={styles.add}>
//                         <Ionicons
//                             name="ios-add"
//                             size={48}
//                             color="purple"
//                             style={{ marginTop: 6, marginLeft: 2 }}
//                         ></Ionicons>
//                     </View>
//                 </View>

//                 <View style={styles.infoContainer}>
//                     {user && (
//                         <View >
//                             <Text style={[styles.text, { fontWeight: "200", fontSize: 20, textAlign: 'center' }]}>
//                                 User Profile</Text>
//                             <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
//                                 {user.email}</Text>
//                             {/* Password is not displayed for security reasons */}
//                         </View>
//                     )}

//                     <Text style={[styles.text, { color: "#EC8F5E", fontSize: 20 }]}>
//                         Customer
//                     </Text>
//                 </View>

//                 <View style={styles.statsContainer}>
//                     <View style={styles.statsBox}>
//                         <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
//                         <Text style={[styles.text, styles.subText]}>Posts</Text>
//                     </View>
//                     <View
//                         style={[
//                             styles.statsBox,
//                             {
//                                 borderColor: "#FFC0CB",
//                                 borderLeftWidth: 1,
//                                 borderRightWidth: 1,
//                             },
//                         ]}
//                     >
//                         <Text style={[styles.text, { fontSize: 24 }]}>4599</Text>
//                         <Text style={[styles.text, styles.subText]}>Amount Paid</Text>
//                     </View>
//                     <View style={styles.statsBox}>
//                         <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
//                         <Text style={[styles.text, styles.subText]}>Pending Amount</Text>
//                     </View>
//                 </View>


//                 <View style={{ alignItems: "center", marginTop: 20 }}>
//                     <Button
//                         title='Logout'
//                         onPress={() => {
//                             signOutUser();
//                         }}
//                     />
//                 </View>

//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     text: {
//         fontFamily: "HelveticaNeue",
//         color: "purple",
//     },
//     image: {
//         flex: 1,
//         height: undefined,
//         width: undefined,
//     },
//     titleBar: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         marginTop: 24,
//         marginHorizontal: 16,
//     },
//     subText: {
//         fontSize: 12,
//         color: "#722F37",
//         textTransform: "uppercase",
//         fontWeight: "500",
//     },
//     profileImage: {
//         width: 200,
//         height: 200,
//         borderRadius: 100,
//         overflow: "hidden",
//     },
//     dm: {
//         backgroundColor: "#FFC0CB",
//         position: "absolute",
//         top: 20,
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         alignItems: "center",
//         justifyContent: "center",
//     },

//     active: {
//         backgroundColor: "#34FFB9",
//         position: "absolute",
//         bottom: 28,
//         left: 10,
//         padding: 4,
//         height: 20,
//         width: 20,
//         borderRadius: 10,
//     },
//     add: {
//         backgroundColor: "#FFC0CB",
//         position: "absolute",
//         bottom: 0,
//         right: 0,
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         alignItems: "center",
//         justifyContent: "center",
//     },
//     infoContainer: {
//         alignSelf: "center",
//         alignItems: "center",
//         marginTop: 16,
//     },
//     statsContainer: {
//         flexDirection: "row",
//         alignSelf: "center",
//         marginTop: 32,
//     },
//     statsBox: {
//         alignItems: "center",
//         flex: 1,
//     },
//     mediaImageContainer: {
//         width: 180,
//         height: 200,
//         borderRadius: 12,
//         overflow: "hidden",
//         marginHorizontal: 10,
//     },
//     mediaCount: {
//         backgroundColor: "#C3B1E1",
//         position: "absolute",
//         top: "50%",
//         marginTop: -50,
//         marginLeft: 30,
//         width: 100,
//         height: 100,
//         alignItems: "center",
//         justifyContent: "center",
//         borderRadius: 12,
//         shadowColor: "rgba(0, 0, 0, 0.38)",
//         shadowOffset: { width: 0, height: 10 },
//         shadowRadius: 20,
//         shadowOpacity: 1,
//     },
//     recent: {
//         marginLeft: 78,
//         marginTop: 32,
//         marginBottom: 6,
//         fontSize: 10,
//     },
//     recentItem: {
//         flexDirection: "row",
//         alignItems: "flex-start",
//         marginBottom: 16,
//     },
//     activityIndicator: {
//         backgroundColor: "#722F37",
//         padding: 4,
//         height: 12,
//         width: 12,
//         borderRadius: 6,
//         marginTop: 3,
//         marginRight: 20,
//     },
// });

// export default ProfileScreen;


import React, { useState, useEffect } from "react";
import useAuth from '../hooks/useAuth';
import { View, Text, Image, StyleSheet, FlatList } from "react-native";

const UserProfileScreen = ({ navigation }) => {
  const { signOutUser } = useAuth();
  const { user } = useAuth();
  // Dummy data for previous orders
  const [previousOrders, setPreviousOrders] = useState([]);

  useEffect(() => {
    // Fetch user's previous orders from your backend or storage
    // For demonstration, using static data here

    const dummyOrders = [
      {
        id: "1",
        service: "Wash and Fold",
        date: "2023-01-10",
        total: "$10.00",
      },
      { id: "2", service: "Dry Cleaning", date: "2023-01-15", total: "$10.00" },
    ];

    setPreviousOrders(dummyOrders);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderService}>{item.service}</Text>
      <Text style={styles.orderDate}>Date: {item.date}</Text>
      <Text style={styles.orderTotal}>Total: {item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/back.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>User Profile</Text>
        {/* name , email from firebase */}

        <Text style={styles.userInfo}>Alice Sun</Text>
        <Text style={styles.userInfo}>{user.email}</Text>
        {user && (
  <View>
    {/* <Text style={[styles.userInfo, { fontWeight: "200", fontSize: 36 }]}>
      {user.email}
    </Text> */}
<Text style={styles.userInfo}>{user?.email}</Text>

  </View>
)}


        <Text style={styles.ordersTitle}>Previous Orders</Text>
        <FlatList
          data={previousOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    padding: 16,
    justifyContent: "flex-start", // Align content at the top
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  userInfo: {
    fontSize: 18,
    marginBottom: 8,
    color: "#953553",
  },
  ordersTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
    color: "black",
  },
  orderItem: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  orderService: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#953553",
  },
  orderDate: {
    fontSize: 16,
    color: "#333",
  },
  orderTotal: {
    fontSize: 16,
    color: "#333",
  },
});

export default UserProfileScreen;
