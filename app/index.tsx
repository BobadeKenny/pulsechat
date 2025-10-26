import { StyleSheet } from "react-native";
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
  const {authChecked, user} = useUser()
  const router = useRouter()
  
  useEffect(() => {
    if (authChecked && user != null){
      router.replace("/chats")
    }
  }), [user, authChecked]
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
      <Button onPress={()=>{
        router.push("/auth/login")
      }}>
        <ThemedText>Login</ThemedText>
      </Button>
      <Spacer height={10} />

      <Link href="/auth/register">
        <ThemedText>Register</ThemedText>
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
