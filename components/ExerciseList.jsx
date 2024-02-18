import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SectionList,
  StyleSheet,
} from "react-native";
import ExerciseDetailModal from "./ExerciseDetailModal";
import { COLORS, SIZES } from "../constants";

const ExerciseList = () => {
  const [groupedExercises, setGroupedExercises] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = (exercise) => {
    setSelectedExercise(exercise);
    setModalVisible(true);
  };

  const handleCloseModal = () => setModalVisible(false);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/exercises/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token e445512134e867f974d0fa91ad5fdd19f97bc1fa",
        },
      });

      let data = await response.json();
      console.log("Received data from backend:", data);

      // Sort exercises alphabetically
      data.sort((a, b) => a.name.localeCompare(b.name));

      // Group exercises by the first letter of their name
      const groupedData = data.reduce((groups, item) => {
        const letter = item.name[0].toUpperCase();
        if (!groups[letter]) {
          groups[letter] = [];
        }
        groups[letter].push(item);
        return groups;
      }, {});

      // Convert the grouped data into an array suitable for SectionList
      const groupedDataArray = Object.keys(groupedData).map((key) => ({
        title: key,
        data: groupedData[key],
      }));

      setGroupedExercises(groupedDataArray);
    };

    fetchExercises();
  }, []);

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedExercises}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.subtext}>{item.name}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />

      <ExerciseDetailModal
        exercise={selectedExercise}
        isVisible={modalVisible}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    width: "100%",
    display: "flex",
    marginBottom: SIZES.small / 2,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 17,
    padding: SIZES.small,
  },
  text: {
    fontSize: 15,
  },
  subtext: {
    fontSize: 13,
  },
});

export default ExerciseList;
