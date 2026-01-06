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
      throw new Error(error.message);
      
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
      throw new Error(error.message);
      
    }
  }

  async function register(username, email, password) {
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
            password: password,
          }),
        }
      );
      const data = await resp.json();
      await saveTokens(data);
      await userDetails();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function logout() {
    try {
      await customFetch("auth/logout/", "POST", {
        token: await SecureStore.getItemAsync("refresh"),
      });
      deleteTokens();
      setUser(null);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function getInitialUserValue() {
    try {
      await userDetails();
    } catch (error) {
      setUser(null);
      throw new Error(error.message);    
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
