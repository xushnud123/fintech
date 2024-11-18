import cn from "@/lib/cn";
import colors from "@/styles/colors";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { BlurView } from "expo-blur";
import CustomHeader from "@/components/custom-header";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({ icon, color, name, iconName, focused, size }: any) => {
  return (
    <View className='flex flex-col items-center gap-[6px] mt-2'>
      <FontAwesome name={iconName} size={size} color={color} />
      <Text
        className={cn(
          "text-[12px]  text-gray-900",
          !!focused
            ? "font-robMed text-framPurple-600"
            : "font-rob text-gray-400"
        )}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Roboto-regular",
            color: colors.gray,
            borderTopColor: "#667085",
            borderTopWidth: 1,
          },
          tabBarStyle: {
            backgroundColor: "transparent",
            position: "absolute",
            left: 0,
            bottom: 0,
            right: 0,
            elevation: 0,
            borderTopWidth: 0,
          },
          tabBarBackground: () => (
            <BlurView
              intensity={100}
              tint='extraLight'
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.05)" }}
            />
          ),
        }}
      >
        <Tabs.Screen
          name='home'
          options={{
            title: "Home",
            tabBarIcon: (props) => (
              <TabIcon {...props} name='Home' iconName='registered' />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name='invest'
          options={{
            title: "Invest",
            tabBarIcon: (props) => (
              <TabIcon {...props} name='Invest' iconName='line-chart' />
            ),
          }}
        />
        <Tabs.Screen
          name='transfers'
          options={{
            title: "Transfers",
            tabBarIcon: (props) => (
              <TabIcon {...props} name='Transfers' iconName='exchange' />
            ),
          }}
        />
        <Tabs.Screen
          name='crypto'
          options={{
            title: "Crypto",
            tabBarIcon: (props) => (
              <TabIcon {...props} name='Crypto' iconName='bitcoin' />
            ),
            header: () => <CustomHeader />,
            headerTransparent: true,
          }}
        />
        <Tabs.Screen
          name='lifestyle'
          options={{
            title: "Lifestyle",
            tabBarIcon: (props) => (
              <TabIcon {...props} name='Lifestyle' iconName='th' />
            ),
          }}
        />
      </Tabs>
      <StatusBar style='dark' />
    </>
  );
};

export default TabLayout;
