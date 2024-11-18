import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "expo-blur";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getAppIcon, setAppIcon } from "expo-dynamic-app-icon";
import colors from "@/styles/colors";

const ICONS = [
  {
    name: "Default",
    icon: require("@/assets/images/icon.png"),
  },
  {
    name: "Dark",
    icon: require("@/assets/images/icon-dark.png"),
  },
  {
    name: "Vivid",
    icon: require("@/assets/images/icon-vivid.png"),
  },
];

const Account = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [edit, setEdit] = useState(false);
  const [activeIcon, setActiveIcon] = useState("Default");

  const onSaveUser = async () => {
    if (firstName && lastName) {
      try {
        await user?.update({ firstName, lastName });
        setEdit(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Hamma inputlarni toldiring");
    }
  };
  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      await user?.setProfileImage({ file: base64 });
    }
  };
  const onChangeAppIcon = async (icon: string) => {
    await setAppIcon(icon.toLowerCase());
    setActiveIcon(icon);
  };

  useEffect(() => {
    const loadCurrentIconPref = async () => {
      const icon = await getAppIcon();
      console.log("🚀 ~ loadCurrentIconPref ~ icon:", icon);
      setActiveIcon(icon);
    };
    loadCurrentIconPref();
  }, []);

  return (
    <BlurView
      intensity={80}
      className='flex-1 bg-black/50 pt-[100px]'
      style={{ backgroundColor: "rgba(0,0,0,0.50)" }}
    >
      <View className='items-center justify-center'>
        <TouchableOpacity
          onPress={onCaptureImage}
          className='size-[100px] rounded-full bg-gray-300'
        >
          {user?.imageUrl && (
            <Image
              source={{ uri: user?.imageUrl }}
              className='size-[100px] rounded-full'
            />
          )}
        </TouchableOpacity>
        {!edit && (
          <View className='m-5 flex-row gap-5 items-center'>
            <Text className='text-black text-2xl font-robMed'>
              {user?.firstName}&nbsp;
              {user?.lastName}
            </Text>
            <TouchableOpacity onPress={() => setEdit(true)}>
              <Ionicons
                name='ellipsis-horizontal'
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>
        )}
        {edit && (
          <View className='w-full  flex-row gap-3 items-center justify-center mt-5'>
            <TextInput
              placeholder='First Name'
              value={firstName || ""}
              onChangeText={setFirstName}
              className='w-[180px] h-[44px] border border-gray-300 text-xl leading-tight font-rob rounded-xl px-3 bg-white'
            />
            <TextInput
              placeholder='Last Name'
              value={lastName || ""}
              onChangeText={setLastName}
              className='w-[180px] h-[44px] border border-gray-300 text-xl leading-tight font-rob rounded-xl px-3 bg-white'
            />
            <TouchableOpacity onPress={onSaveUser}>
              <Ionicons
                name='checkmark-outline'
                size={24}
                color={colors.gray}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className='rounded-2xl gap-0 m-5 bg-black/15'>
        <TouchableOpacity
          className='p-4 flex-row gap-5'
          onPress={() => signOut()}
        >
          <Ionicons name='log-out' size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-4 flex-row gap-5'>
          <Ionicons name='person' size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-4 flex-row gap-5'>
          <Ionicons name='bulb' size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18 }}>Learn</Text>
        </TouchableOpacity>
        <TouchableOpacity className='p-4 flex-row gap-5'>
          <Ionicons name='megaphone' size={24} color={"#fff"} />
          <Text style={{ color: "#fff", fontSize: 18, flex: 1 }}>Inbox</Text>
          <View
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className='rounded-2xl gap-0 m-5 bg-black/15'>
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            className='p-4 flex-row gap-5'
            onPress={() => onChangeAppIcon(icon.name)}
          >
            <Image source={icon.icon} style={{ width: 24, height: 24 }} />
            <Text style={{ color: "#fff", fontSize: 18 }}>{icon.name}</Text>
            {activeIcon.toLowerCase() === icon.name.toLowerCase() && (
              <Ionicons name='checkmark' size={24} color={"#fff"} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </BlurView>
  );
};

export default Account;
