import { StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

import "../global.css";
import ThemedLogo from "../components/ThemedLogo";
import Button from "../components/Button";

const Home = () => {
  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedLogo style={styles.img} />
      <Spacer />
      <ThemedText title={true} className="text-2xl font-title font-bold">
        Welcome to PulseChat
      </ThemedText>
      <ThemedText>Connect to friends and family instantly.</ThemedText>
      <ThemedText>Sign up or log in to start chatting.</ThemedText>
      <Spacer />
      <Link href="/auth/login">
        <ThemedText>Login</ThemedText>
      </Link>
      {/* <Button onPress={()=>{
        router.push("/auth/login")
      }}>
        <ThemedText>Login</ThemedText>
      </Button> */}
      <Spacer height={10} />

      <Link href="/auth/register">
        <ThemedText>Register</ThemedText>
      </Link>
      <Spacer height={10} />
      <Link href="/profile">
        <ThemedText>Profile</ThemedText>
      </Link>
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
