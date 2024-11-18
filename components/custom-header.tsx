import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/styles/colors";
import { Link } from "expo-router";

const CustomHeader = () => {
  const {} = useUser();
  const { top } = useSafeAreaInsets();

  return (
    <BlurView
      intensity={80}
      tint='extraLight'
      style={{
        paddingTop: top,
      }}
    >
      <View className='flex-row w-full gap-4 justify-center items-center h-[60px] bg-transparent px-5'>
        <Link href='/(authenticated)/(modals)/account' asChild>
          <TouchableOpacity className='size-10 rounded-[20px] bg-gray-300 justify-center items-center'>
            <Text className='text-gray-900'>SG</Text>
          </TouchableOpacity>
        </Link>
        <View className='flex-row gap-2 items-center border-gray-400 border rounded-[20px] px-[10px] flex-1 bg-gray-200'>
          <Ionicons name='search' size={20} color={colors.dark} />
          <TextInput
            className='h-10 text-dark'
            placeholder='Search'
            placeholderTextColor={colors.dark}
          />
        </View>
        <View className='size-10 rounded-[20px] bg-gray-300 justify-center items-center'>
          <Ionicons name='stats-chart' size={20} color={colors.dark} />
        </View>
        <View className='size-10 rounded-[20px] bg-gray-300 justify-center items-center'>
          <Ionicons name='card' size={20} color={colors.dark} />
        </View>
      </View>
    </BlurView>
  );
};

export default CustomHeader;
