import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3D38ED",
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: "Home",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='registered' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='invest'
        options={{
          title: "Invest",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='line-chart' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='transfers'
        options={{
          title: "Transfers",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='exchange' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='crypto'
        options={{
          title: "Crypto",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='bitcoin' size={size} color={color} />
          ),
          // header: () => <CustomHeader />,
          headerTransparent: true,
        }}
      />
      <Tabs.Screen
        name='lifestyle'
        options={{
          title: "Lifestyle",
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name='th' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
