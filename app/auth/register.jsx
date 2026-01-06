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
import { Ionicons } from "@expo/vector-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState("")

  const { register } = useUser();
  const handleSubmit = async () => {
    setError(null)
    if (password != confirmPassword) {
      setError("Oops! Your passwords don’t match. Try again.")
    }
    try {
      await register(username, email, password);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer height={10} />
        <ThemedText title={true} style={styles.title}>
          Register to your account
        </ThemedText>
        <Spacer height={100} />
        {error && (
          <ThemedView style={styles.errorContainer}>
            <Ionicons
              color={Colors.warning}
              name="information-circle"
              size={20}
            />
            <Text style={styles.errorText}>{error}</Text>
          </ThemedView>
        )}
        <Input
          className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-transparent focus:border-primary focus:ring-primary rounded-lg p-4"
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Spacer height={10} />
        <Input
          className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-transparent focus:border-primary focus:ring-primary rounded-lg p-4"
          placeholder="Username"
          keyboardType="default"
          onChangeText={setUsername}
          value={username}
        />
        <Spacer height={10} />
        <Input
          className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-transparent focus:border-primary focus:ring-primary rounded-lg p-4"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Spacer height={10} />
        <Input
          className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-transparent focus:border-primary focus:ring-primary rounded-lg p-4"
          placeholder="Confirm Password"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />
        <Spacer height={12} />
        <Button
          onPress={handleSubmit}
          className="rounded-lg bg-primary px-4 py-4 w-full h-12 max-w-sm items-center justify-center"
        >
          <Text className="font-semibold text-white">Sign Up</Text>
        </Button>
        <Spacer height={250} />
        <ThemedText className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </ThemedText>
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
    marginBottom: 20,
  },
  btn: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  pressed: {
    opacity: 0.8,
  },
  errorContainer: {
    marginBottom: 32,
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.error,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    width: "90%"
  },
  errorText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.warning,
    flex: 1,
  },
});
