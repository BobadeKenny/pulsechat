import { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  const saveTokens = async (tokens) => {
    if (tokens.access) {
      await SecureStore.setItemAsync("access", tokens.access);
    }
    if (tokens.refresh) {
      await SecureStore.setItemAsync("refresh", tokens.refresh);
    }
  };

  const deleteTokens = async () => {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
  };

  async function userDetails(token) {
    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}auth/user/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user_data = await resp.json();
      setUser(user_data);
      console.log("user ", user_data);
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
      saveTokens(data);
      userDetails(data.access);
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
      saveTokens(data);
      userDetails(data.access);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      const resp = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}auth/logout/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: await SecureStore.getItemAsync("refresh"),
          }),
        }
      );
      const data = await resp.json();
      console.log(data);
      deleteTokens();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function refresh() {
    try {
      const refreshToken = await SecureStore.getItemAsync("refresh");

      if (refreshToken != null) {
        const resp = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}auth/token/refresh/`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              refresh: refreshToken,
            }),
          }
        );
        const data = await resp.json();
        userDetails(data.access);
        saveTokens(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Error: ", error);
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, authChecked }}
    >
      {children}
    </UserContext.Provider>
  );
}
