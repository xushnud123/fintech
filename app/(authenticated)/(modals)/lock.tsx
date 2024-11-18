import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import * as LocalAuthentication from "expo-local-authentication";
import * as Haptics from "expo-haptics";
import cn from "@/lib/cn";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const Lock = () => {
  const { user } = useUser();
  const [code, setCode] = useState<number[]>([]);
  const codeLength = Array(6).fill(0);
  const offset = useSharedValue(0);
  const OFFSET = 20;
  const TIME = 80;

  useEffect(() => {
    if (code.length === 6) {
      if (code.join("") === "111111") {
        router.replace("/(authenticated)/(tabs)/home");
        setCode([]);
      } else {
        offset.value = withSequence(
          withTiming(-OFFSET, { duration: TIME / 2 }),
          withRepeat(withTiming(OFFSET, { duration: TIME }), 4, true),
          withTiming(0, { duration: TIME / 2 })
        );
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setCode([]);
      }
    }
  }, [code]);

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value,
        },
      ],
    };
  });

  const onNumberPress = (number: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([...code, number]);
  };

  const numberBackspace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const onBiometricAuthPress = async () => {
    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      router.replace("/(authenticated)/(tabs)/home");
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };
  return (
    <SafeAreaView className=''>
      <Text className='text-2xl text-dark font-ibmMed text-center mt-20'>
        Welcome back, {user?.username}
      </Text>
      <Animated.View
        className='flex-row justify-center w-full flex-wrap gap-5 my-[100px]'
        style={[style]}
      >
        {codeLength.map((_, index) => (
          <View
            key={index}
            className={cn(
              "size-[20px] bg-gray-300 rounded-full justify-center items-center",
              code[index] && "bg-framPurple-600"
            )}
          ></View>
        ))}
      </Animated.View>
      <View className='mx-20 gap-12'>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[1, 2, 3].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              className='bg-slate-200 size-20 rounded-full justify-center items-center'
            >
              <Text className='text-2xl font-robMed'>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[4, 5, 6].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              className='bg-slate-200 size-20 rounded-full justify-center items-center'
            >
              <Text className='text-2xl font-robMed'>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {[7, 8, 9].map((number) => (
            <TouchableOpacity
              key={number}
              onPress={() => onNumberPress(number)}
              className='bg-slate-200 size-20 rounded-full justify-center items-center'
            >
              <Text className='text-2xl font-robMed'>{number}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={onBiometricAuthPress}
            className='size-20 rounded-full justify-center items-center'
          >
            <MaterialCommunityIcons
              name='face-recognition'
              size={26}
              color='black'
            />
          </TouchableOpacity>

          <TouchableOpacity className='bg-slate-200 size-20 rounded-full justify-center items-center'>
            <Text className='text-2xl font-robMed'>0</Text>
          </TouchableOpacity>

          <View style={{ minWidth: 30 }} className='size-20'>
            {code.length > 0 && (
              <TouchableOpacity
                onPress={numberBackspace}
                className='size-20 rounded-full justify-center items-center'
              >
                <Text>
                  <MaterialCommunityIcons
                    name='backspace-outline'
                    size={26}
                    color='black'
                  />
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Lock;
