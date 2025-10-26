import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "../../components/auth/GuestOnly";
import { useUser } from "../../hooks/useUser";

const AuthLayout = () => {
  const { user, authChecked } = useUser();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#ddd" },
        headerTintColor: "#333",
        headerShown: false,
        animation: "none",
      }}
    >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
    </Stack>
  );
};

export default AuthLayout;
