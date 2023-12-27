import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import useFirestore from "../hooks/useFirestore";
import useAuth from "../hooks/useAuth";

const RegisterComponent = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();
  const { emailExists, userExsists, loading } = useFirestore();

  const validateForm = async () => {
    let newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (await emailExists(formData.email)) {
      newErrors.email = "Email already in use";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (await userExsists(formData.username)) {
      newErrors.username = "Username already taken";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (await validateForm()) {
      // Additional user data to be saved in Firestore
      const additionalUserData = {
        username: formData.username,
        email: formData.email,
        // Any other user data fields you want to store
      };
      const result = await signUp(
        formData.email,
        formData.password,
        additionalUserData
      );

      if (result.success) {
        console.log("Registration successful");
        navigation.navigate("Login"); // Replace with your success route
      } else {
        setErrors({ ...errors, general: result.message });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/back.jpg")} style={styles.logo} />

      <Text style={styles.companyName}>Create Account</Text>

      {errors.general && <Text style={styles.errorText}>{errors.general}</Text>}

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        value={formData.username}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username}</Text>
      )}

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        value={formData.email}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        value={formData.password}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.registerButton}>Register</Text>
        )}
      </TouchableOpacity>

      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate("Login")}
      >
        Already have an account? Login here.
      </Text>

      <Text style={styles.switchText}>Or continue with</Text>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/facebook.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={require("../../assets/twitter.png")}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  appName: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#702963",
    position: "absolute",
    zIndex: 1,
    top: 15, // Adjust as needed
    textAlign: "center",
    width: "100%",
  },
  logo: {
    width: "100%", // Make the image cover the whole width
    height: 250,
    resizeMode: "cover", // Use 'cover' to maintain the aspect ratio and cover the width
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  registerButton: {
    backgroundColor: "#953553",
    padding: 10,
    borderRadius: 5,

    alignItems: "center",
    width: "100%",
    color: "white",
  },
  switchText: {
    marginTop: 20,
    color: "#953553",
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#702963",
    marginBottom: 30,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  socialButton: {
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

export default RegisterComponent;
