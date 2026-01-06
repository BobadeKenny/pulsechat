import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import ThemedView from "../../components/ThemedView";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import { Link } from "expo-router";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useUser } from "../../hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../utils/Colors";


const Login = () => {
  const handleSubmit = async () => {
    setError(null)
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message)
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { login } = useUser();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container}>
        <Spacer height={10} />
        <ThemedText className="text-2xl font-title font-bold" title={true}>
          Welcome Back!
        </ThemedText>
        <ThemedText className="mt-3 text-lg">
          Sign in to your account
        </ThemedText>
        <Spacer />
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
          placeholder="Username or Email"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
        />
        <Spacer height={20} />
        <Input
          className="w-full max-w-sm bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-transparent focus:border-primary focus:ring-primary rounded-lg p-4"
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <Spacer height={50} />
        <Button
          onPress={handleSubmit}
          className="rounded-lg bg-primary px-4 py-4 w-full h-12 max-w-sm items-center justify-center"
        >
          <Text className="font-semibold text-white">Sign In</Text>
        </Button>
<Spacer height={180} />
        <ThemedText className="text-center text-sm text-gray-500 dark:text-gray-400">
          Don't have an account?
          <Link
            href="/auth/register"
            className="font-medium text-primary hover:underline"
          >
            Sign In
          </Link>
        </ThemedText>>
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
