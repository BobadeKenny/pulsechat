import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { Icon } from "../assets/img/favicon.png";
import ThemedView from "../components/ThemedView";
import Spacer from "../components/Spacer";
import ThemedText from "../components/ThemedText";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <Image source={Icon} style={styles.img}></Image>
      <Spacer />
      <Link href="/auth/login" style={styles.link}>
        <ThemedText>Login</ThemedText>
      </Link>
      <Link href="/auth/register" style={styles.link}>
        <ThemedText>Register</ThemedText>
      </Link>
      <Link href="/profile" style={styles.link}>
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
    marginVertical: 50,
    backgroundColor: "red",
  },
  link: {
    backgroundColor: "#eeee",
  },
});
