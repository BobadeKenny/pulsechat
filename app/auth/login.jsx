import { StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";

const Login = () => {
  const handleSubmit = async() => {
    console.log("login form submitted", email, password);
    try{
      await login(email, password)

    }catch(error){
      console.log(error)
    }
  };
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {login} = useUser()
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

    <ThemedView style={styles.container}>
      <Spacer />
      <ThemedText title={true} style={styles.title}>
        Login to your account
      </ThemedText>
      <Input
        style={{ width: "80%", marginBottom: 20 }}
        placeholder="Username or Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <Input
        style={{ width: "80%", marginBottom: 20 }}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Button onPress={handleSubmit}>
        <Text style={{ color: "#f2f2f2" }}>Login</Text>
      </Button>
      <Spacer height={100} />
      <Link href="/auth/register">
        <ThemedText style={{ textAlign: "center" }}>
          Register instead
        </ThemedText>
      </Link>
    </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 30,
  },
});
