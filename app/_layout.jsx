import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { useColorScheme } from "react-native";
import { Colors } from "../utils/Colors";

const RootLayout = () => {
  const theme = Colors[useColorScheme()] ?? Colors.light
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTitle: "PulseChat",
          headerTitleStyle: { color: theme.text },
          headerShadowVisible: false,
        }}
      >
        {/* <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} /> */}
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
