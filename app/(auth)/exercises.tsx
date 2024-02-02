import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { storeToken } from "../../authTokenStorage"; // Adjust the import path as needed

const exercises = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          // Send token to backend and handle response
          fetch("http://127.0.0.1:8000/api/test-token/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          })
            .then((response) => response.json())
            .then((data) => {
              setMessage(data.message); // Handle and display the message from backend
              if (data.token) {
                // Assuming the backend sends the Django token under the key 'token'
                storeToken(data.token)
                  .then(() => console.log("Token stored successfully"))
                  .catch((error) =>
                    console.error("Error storing token:", error)
                  );
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      }
    });
  }, []);
  return (
    <View>
      <Text>exercises</Text>
      <Text>{message}</Text>
    </View>
  );
};

export default exercises;
