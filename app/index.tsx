import { StyleSheet, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

import '../global.css'
import ThemedLogo from "../components/ThemedLogo";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo style={styles.img} />
      <Spacer />
      <Link href="/auth/login">
        <ThemedText>Login</ThemedText>
      </Link>
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
    justifyContent: "center",
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
    height:100
  },
  link: {
    backgroundColor: "#eeee",
  },
});
