import React from "react";
import { Stack, Tabs } from "expo-router";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS, icons, FONT } from "../../constants";

const AuthLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.primary }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={icons.home} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          tabBarLabel: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={icons.dumbbell} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="session"
        options={{
          tabBarLabel: "Start Session",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={icons.plus} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={icons.clock} color={color} size={20} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={icons.user} color={color} size={20} />
          ),
        }}
      />
    </Tabs>
  );
};

export default AuthLayout;
