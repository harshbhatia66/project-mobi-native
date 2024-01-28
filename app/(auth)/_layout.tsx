import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";

const AuthLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen name="home" options={{ tabBarLabel: "Home" }} />
      <Tabs.Screen name="exercises" options={{ tabBarLabel: "Exercises" }} />
      <Tabs.Screen name="workout" options={{ tabBarLabel: "Workout" }} />
    </Tabs>
  );
};

export default AuthLayout;
