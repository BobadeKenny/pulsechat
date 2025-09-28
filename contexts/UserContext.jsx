import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { customFetch, deleteTokens, saveTokens } from "../utils/FetchUtils";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function userDetails() {
    try {
      const userData = await customFetch("auth/user/", "GET");
      setUser(userData);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(username_or_email, password) {
    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}auth/login/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username_or_email: username_or_email,
            password: password,
          }),
        }
      );
      const data = await resp.json();
      await saveTokens(data);
      await userDetails();
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function register(username, email, password, first_name, last_name) {
    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}auth/register/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: password,
          }),
        }
      );
      const data = await resp.json();
      await saveTokens(data);
      await userDetails();
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const data = await customFetch("auth/logout/", "POST", {
        token: await SecureStore.getItemAsync("refresh"),
      });
      console.log(data);
      deleteTokens();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function getInitialUserValue() {
    try {
      await userDetails();
    } catch (error) {
      console.log("Error: ", error);
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
