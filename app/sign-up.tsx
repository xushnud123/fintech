import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles/styles";
import { Link, useRouter } from "expo-router";
import cn from "@/lib/cn";
import { useSignUp } from "@clerk/clerk-expo";

const SignUp = () => {
  const { signUp } = useSignUp();
  const [form, setForm] = useState({ email: "", password: "", username: "" });
  const keyboardVerticalOffset = Platform.OS ? 120 : 0;
  const router = useRouter();

  const onSignUp = async () => {
    try {
      await signUp?.create({
        emailAddress: form.email,
        password: form.password,
        username: form.username,
      });
      signUp?.prepareEmailAddressVerification();
      router.push({
        pathname: "/verify/[email]",
        params: { ...form },
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      className=' bg-purple-200 h-full'
      style={{ flex: 1 }}
      behavior='padding'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View
        className={cn("justify-between  min-h-full", defaultStyles.container)}
      >
        <Text className={defaultStyles.header}>Le'ts get started!</Text>
        <Text className={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <Text className={defaultStyles.descriptionText}>Username</Text>
        <View className='w-full flex-row mt-2 gap-2'>
          <TextInput
            className='bg-lightGray flex-1 items-center p-5 text-xl leading-[22px] rounded-2xl'
            placeholderTextColor='rgba(98, 109, 119,0.6)'
            placeholder='name...'
            keyboardType='email-address'
            value={form.username}
            onChangeText={(username) => setForm({ ...form, username })}
          />
        </View>
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
        <Link href='/login' asChild className='mt-4'>
          <TouchableOpacity>
            <Text className={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <View className='flex-1'></View>

        <TouchableOpacity
          onPress={onSignUp}
          className={cn(
            defaultStyles.pillButton,
            "mt-5 bg-dark",
            !!form.email && !!form.password && !!form.username
              ? "bg-primary"
              : "bg-primaryMuted"
          )}
        >
          <Text className={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
