import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";
import { useColorScheme } from "react-native";
import { Colors } from "../utils/Colors";
import { useUser } from "../hooks/useUser";

const RootLayout = () => {
  return (
    <UserProvider>
      <Root />
    </UserProvider>
  );
};

const Root = () => {
  const theme = Colors[useColorScheme()] ?? Colors.light;
  const { user, authChecked } = useUser();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.background },
        headerTitle: "PulseChat",
        headerTitleStyle: { color: theme.text },
        headerShadowVisible: false,
      }}
    >
      <Stack.Protected guard={authChecked && user === null}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={authChecked && user !== null}>
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Screen name="index" options={{ title: "Home" }} />
    </Stack>
  );
};

export default RootLayout;
