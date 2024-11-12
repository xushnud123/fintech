import { useFonts } from "expo-font";
import { ClerkProvider, ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { Link, Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useRef } from "react";
import "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import "./global.css";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const isInitialRender = useRef(true);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === "(authenticated)";

    if (!isInitialRender.current) {
      if (isSignedIn && !inAuthGroup) {
        router.replace("/(authenticated)/(tabs)/home");
      } else if (!isSignedIn) {
        router.replace("/");
      }
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen
          name='login'
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: -10 }}
                onPress={() => router.back()}
              >
                <Ionicons name='arrow-back' size={34} className='text-dark' />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <Link href='/help' asChild>
                <TouchableOpacity style={{ marginRight: -10 }}>
                  <Ionicons
                    name='help-circle-outline'
                    size={34}
                    className='text-dark'
                  />
                </TouchableOpacity>
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name='sign-up'
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: -10 }}
                onPress={() => router.back()}
              >
                <Ionicons name='arrow-back' size={34} className='text-dark' />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name='(authenticated)/(tabs)'
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='help'
          options={{ title: "Help", presentation: "modal" }}
        />
        <Stack.Screen
          name='verify/[email]'
          options={{
            title: "",
            headerBackTitle: "",
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: "#F5F5F5",
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: -10 }}
                onPress={() => router.back()}
              >
                <Ionicons name='arrow-back' size={34} className='text-dark' />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    "IBM-Plex-Sans-medium": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-Medium.woff2"),
    "IBM-Plex-Sans-semibold": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-SemiBold.woff2"),
    "IBM-Plex-Sans-bold": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-Bold.woff2"),
    "Roboto-medium": require("../assets/fonts/roboto/Roboto-Medium.woff2"),
    "Roboto-regular": require("../assets/fonts/roboto/Roboto-Regular.woff2"),
    "Roboto-bold": require("../assets/fonts/roboto/Roboto-Bold.woff2"),
  });
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  if (!loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey!} tokenCache={tokenCache}>
      <ClerkLoaded>
        <StatusBar style='light' />
        <InitialLayout />
        <Toast />
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
