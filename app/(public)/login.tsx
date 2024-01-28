import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { Link, router } from "expo-router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in!");
      // Handle successful login here
    } catch (error) {
      // Handle login error here
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <Pressable onPress={() => router.push("/(public)/register")}>
        <Text>Don't have an account? Sign up here</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(public)/reset")}>
        <Text>Forgot your password?</Text>
      </Pressable>
    </View>
  );
};

export default Login;
