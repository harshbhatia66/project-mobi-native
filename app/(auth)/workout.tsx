import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { retrieveToken } from "../../authTokenStorage"; // Adjust the import path as needed

const Workout = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const token = await retrieveToken();
        if (!token) {
          console.log("No token found, unauthorized request");
          return;
        }
        console.log("Token found", token);

        const response = await fetch("http://127.0.0.1:8000/api/exercises/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exercises");
        }

        const data = await response.json();
        setExercises(data); // Assuming the API response is the array of exercises
      } catch (error) {
        console.error("Error fetching exercises:", error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <View>
      <Text>Workout</Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>} // Adjust according to your exercise object structure
      />
    </View>
  );
};

export default Workout;
