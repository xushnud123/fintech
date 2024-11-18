import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAssets } from "expo-asset";
import { ResizeMode, Video } from "expo-av";
import { Link } from "expo-router";
import cn from "@/lib/cn";
import { defaultStyles } from "@/styles/styles";

const Index = () => {
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")]);

  return (
    <View className='h-full justify-between'>
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          isMuted
          isLooping
          shouldPlay
          resizeMode={ResizeMode.COVER}
          style={{
            width: "100%",
            height: "100%",
            minWidth: "100%",
            minHeight: "100%",
            position: "absolute",
          }}
        />
      )}
      <View className='mt-20 p-5'>
        <Text className='text-[36px] font-bold  text-white uppercase'>
          Ready to change the way you money?
        </Text>
      </View>

      <View className='flex-row gap-5 mb-[60px] px-5 justify-center'>
        <Link
          href={"/login"}
          asChild
          className={cn("bg-dark flex-1", defaultStyles.pillButton)}
        >
          <TouchableOpacity>
            <Text className='text-2xl font-medium text-white text-center'>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href='/sign-up'
          asChild
          className={cn("bg-white flex-1", defaultStyles.pillButton)}
        >
          <TouchableOpacity>
            <Text className='text-2xl font-medium text-center'>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default Index;
