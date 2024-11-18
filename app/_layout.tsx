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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import colors from "@/styles/colors";
import UserInactivity from "@/context/user-Inactivity";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

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

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
  }, []);

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

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
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
          name='(authenticated)/crypto/[id]'
          options={{
            title: "",
            headerLeft: () => (
              <TouchableOpacity onPress={router.back}>
                <Ionicons name='arrow-back' size={34} color={colors.dark} />
              </TouchableOpacity>
            ),
            headerLargeTitle: true,
            headerTransparent: true,
            headerRight: () => (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <TouchableOpacity>
                  <Ionicons
                    name='notifications-outline'
                    color={colors.dark}
                    size={30}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Ionicons name='star-outline' color={colors.dark} size={30} />
                </TouchableOpacity>
              </View>
            ),
          }}
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
        <Stack.Screen
          name='(authenticated)/(modals)/lock'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='(authenticated)/(modals)/account'
          options={{
            presentation: "transparentModal",
            animation: "fade",
            title: "",
            headerTransparent: true,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: -10 }}
                onPress={() => router.back()}
              >
                <Ionicons
                  name='close-outline'
                  size={34}
                  className='text-dark'
                />
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
    "IBM-Plex-Sans-regular": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-Regular.ttf"),
    "IBM-Plex-Sans-medium": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-Medium.ttf"),
    "IBM-Plex-Sans-semibold": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-SemiBold.ttf"),
    "IBM-Plex-Sans-bold": require("../assets/fonts/ibm_plex_sans/IBMPlexSans-Bold.ttf"),
    "Roboto-medium": require("../assets/fonts/roboto/Roboto-Medium.ttf"),
    "Roboto-regular": require("../assets/fonts/roboto/Roboto-Regular.ttf"),
    "Roboto-bold": require("../assets/fonts/roboto/Roboto-Bold.ttf"),
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
        <QueryClientProvider client={queryClient}>
          <UserInactivity>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <InitialLayout />
              <Toast />
              <StatusBar style='light' />
            </GestureHandlerRootView>
          </UserInactivity>
        </QueryClientProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
