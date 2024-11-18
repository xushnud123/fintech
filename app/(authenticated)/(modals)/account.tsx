import { View, Text } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const Account = () => {
  return (
    <BlurView intensity={80} className='flex-1 bg-black/[0.05]'>
      <Text>Account</Text>
    </BlurView>
  );
};

export default Account;
