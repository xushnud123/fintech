import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles/styles";
import cn from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { router } from "expo-router";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const keyboardVerticalOffset = Platform.OS ? 90 : 0;
  const { signIn, setActive } = useSignIn();

  const onSignIn = async (type: SignInType) => {
    if (type === SignInType.Phone) {
      try {
        const response = await signIn?.create({
          identifier: form.email,
          password: form.password,
        });

        await setActive!({ session: response?.createdSessionId });
        router.push({
          pathname: "/(authenticated)/(tabs)/home",
        });
      } catch (error: any) {
        console.log(error);
        if (isClerkAPIResponseError(error)) {
          console.error(error);
        } else {
          console.error(error);
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      className='bg-purple-200 h-full'
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View className={cn(" min-h-full", defaultStyles.container)}>
        <Text className={defaultStyles.header}>Welcome back</Text>
        <Text className={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>

        <Text className={defaultStyles.descriptionText}>Email</Text>
        <View className='w-full flex-row mt-2 gap-2'>
          <TextInput
            className='bg-lightGray flex-1 items-center p-5 text-xl leading-[22px] rounded-2xl'
            placeholderTextColor='rgba(98, 109, 119,0.6)'
            placeholder='linda@framcreative.com'
            keyboardType='email-address'
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
          />
        </View>
        <Text className={defaultStyles.descriptionText}>Password</Text>
        <View className='w-full flex-row mt-2 gap-2'>
          <TextInput
            className='bg-lightGray flex-1 items-center p-5 text-xl leading-[22px] rounded-2xl'
            placeholderTextColor='rgba(98, 109, 119,0.6)'
            placeholder='Your password'
            keyboardType='email-address'
            value={form.password}
            onChangeText={(password) => setForm({ ...form, password })}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Phone)}
          className={cn(
            defaultStyles.pillButton,
            "mt-5 bg-dark",
            !!form.email && !!form.password
              ? "bg-framPurple-600"
              : "bg-framPurple-300"
          )}
        >
          <Text className={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View className='flex-row items-center gap-4 mt-4'>
          <View className='flex-1 h-[1px] bg-gray-400' />
          <Text className='text-gray-400 text-xl'>or</Text>
          <View className='flex-1 h-[1px] bg-gray-400' />
        </View>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          className={cn(
            defaultStyles.pillButton,
            "flex-row gap-4 mt-5 bg-white"
          )}
        >
          <Ionicons name='logo-google' size={24} color={"#000"} />
          <Text className={cn(defaultStyles.buttonText, "text-black")}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          className={cn(
            defaultStyles.pillButton,
            "flex-row gap-4 mt-5 bg-white"
          )}
        >
          <Ionicons name='logo-apple' size={24} color={"#000"} />
          <Text className={cn(defaultStyles.buttonText, "text-black")}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
