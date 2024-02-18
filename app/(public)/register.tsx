import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import { COLORS, SIZES } from "../../constants";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Create a new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User account created & signed in!");
    } catch (error) {
      // Handle registration error here
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity onPress={handleRegister} style={styles.submitBtn}>
          <Text style={styles.text}>Register</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    padding: SIZES.small,
  },
  sectionHeader1: {
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: SIZES.small / 2,
  },
  sectionHeader2: {
    fontSize: 26,
    marginBottom: SIZES.large * 2,
  },
  inputContainer: {
    width: "100%",
    marginBottom: SIZES.small,
  },
  inputWrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.small,
  },
  input: {
    padding: SIZES.medium,
    fontSize: 17,
    width: "100%",
    height: 50,
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.large,
  },
  submitBtn: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: SIZES.small,
  },
  forgotPassword: {
    paddingHorizontal: SIZES.medium,
    fontSize: 15,
  },
  text: {
    color: COLORS.lightWhite,
    fontSize: 17,
  },
  registerText: {
    fontSize: 17,
  },
  span: {
    color: COLORS.primary,
  },
});

export default Register;
