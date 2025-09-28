import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import { Colors } from "../../utils/Colors";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("")
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")

  const {register} = useUser()
  const handleSubmit = async() => {
    console.log("Register form submitted", email, password);
    try{
      await register(username, email, password, firstname, lastname)

    }catch(error){
      console.log(error)
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer />
        <ThemedText title={true} style={styles.title}>
          Register to your account
        </ThemedText>
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="First Name"
          keyboardType="default"
          onChangeText={setFirstname}
          value={firstname}
        />
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Last Name"
          keyboardType="default"
          onChangeText={setLastname}
          value={lastname}
        />
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Username"
          keyboardType="default"
          onChangeText={setUsername}
          value={username}
        />
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Button onPress={handleSubmit}>
          <Text style={{ color: "#f2f2f2" }}>Register</Text>
        </Button>
        <Spacer height={100} />
        <Link href="/auth/login">
          <ThemedText style={{ textAlign: "center" }}>Login instead</ThemedText>
        </Link>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
});
