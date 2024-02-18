import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { COLORS, FONT, SIZES } from "../constants";

const bodyParts = ["All", "Chest", "Back", "Shoulders", "Quads", "Hamstrings"];

const SearchHeader = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");

  const [exercises, setExercises] = useState([]);

  const getTabStyle = (item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeTab === item ? COLORS.primary : COLORS.gray2,
  });

  // Function to get dynamic tab text style
  const getTabTextStyle = (item) => ({
    fontFamily: FONT.medium,
    color: activeTab === item ? COLORS.primary : COLORS.gray2,
  });

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/exercises/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token e445512134e867f974d0fa91ad5fdd19f97bc1fa",
        },
      });

      const data = await response.json();
      console.log("Received data from backend:", data); // To check what you're receiving
      setExercises(data); // Assuming the API response is the array of exercises
    };

    fetchExercises();
  }, []);

  return (
    <>
      <View style={styles.searchWrapper}>
        <TextInput
          style={styles.searchInput}
          value=""
          onChange={() => {}}
          placeholder="Search exercises"
        />
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={bodyParts}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={getTabStyle(item)}
              onPress={() => setActiveTab(item)}
            >
              <Text style={getTabTextStyle(item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: 8 }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    width: "100%",
  },
  searchInput: {
    fontSize: 17,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.small,
    marginBottom: SIZES.small,
  },
});

export default SearchHeader;
