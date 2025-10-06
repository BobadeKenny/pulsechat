import React from "react";
import { Stack } from "expo-router";
import GuestOnly from "../../components/auth/GuestOnly";

const AuthLayout = () => {
  return (
    <GuestOnly>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ddd" },
          headerTintColor: "#333",
          headerShown: false,
          animation: "none",
        }}
      ></Stack>
    </GuestOnly>
  );
};

export default AuthLayout;
