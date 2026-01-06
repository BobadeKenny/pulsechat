import { StyleSheet, Text } from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter } from "expo-router";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

import "../global.css";
import ThemedLogo from "../components/ThemedLogo";
import Button from "../components/Button";
import { useUser } from "../hooks/useUser";

const Home = () => {
  const { authChecked, user } = useUser();
  const router = useRouter();

  (useEffect(() => {
    if (authChecked && user != null) {
      router.replace("/chats");
    }
  }),
    [user, authChecked]);
  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer height={100}/>
      <ThemedLogo style={styles.img} />
      <Spacer />
      <ThemedText title={true} className="text-2xl font-title font-bold">
        Welcome to PulseChat
      </ThemedText>
      <Spacer height={10} />
      <ThemedText>Connect to friends and family instantly.</ThemedText>
      <Spacer height={10} />
      <ThemedText>Sign up or log in to start chatting.</ThemedText>
      <Spacer />
      <ThemedView className="w-full space-y-3 items-center">
        <Button
          className="rounded-lg bg-primary px-5 w-full h-12 max-w-sm items-center justify-center"
          onPress={() => {
            router.push("/auth/register");
          }}
        >
          <Text className="font-semibold text-white">Sign Up</Text>
        </Button>
        <Spacer height={10} />
        <Button
          className="rounded-lg bg-primary/20 dark:bg-primary/30 px-5 w-full h-12 max-w-sm items-center justify-center"
          onPress={() => {
            router.push("/auth/login");
          }}
        >
          <Text className="font-semibold text-primary">Log In</Text>
        </Button>
      </ThemedView>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  card: {
    backgroundColor: "#eeee",
    padding: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  link: {
    backgroundColor: "#eeee",
  },
});
