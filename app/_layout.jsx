import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "../contexts/UserContext";

const RootLayout = () => {
  return (
    <UserProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ddd" },
          headerTintColor: "#333",
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
