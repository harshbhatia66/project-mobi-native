import React from "react";
import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";

const Home = () => {
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      // You might want to navigate the user to the login screen after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;
