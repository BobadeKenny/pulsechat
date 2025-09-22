import { createContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const saveTokens = async(tokens) => {
    await SecureStore.setItemAsync("access", tokens.access)
    await SecureStore.setItemAsync("refresh", tokens.refresh)
  }

  async function userDetails(token) {
    try{
      const resp = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}auth/user/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      const user_data = await resp.json()
      setUser(user_data)
    }
    catch (error){
      console.log(error)
    }
  }

  async function login(username_or_email, password) {
    try {
      const resp = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_or_email: username_or_email,
          password: password,
        }),
      });
      const data = await resp.json()
      saveTokens(data)
      userDetails(data.access)
    } catch (error) {
      console.log(error);
    }
  }

  async function register(username, email, password, first_name, last_name) {
    try {
      const resp = await fetch(`${process.env.EXPO_PUBLIC_API_BASE_URL}auth/register/`, {
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
      });
      const data = await resp.json()
      console.log(data)
      saveTokens(data)
      userDetails(data.access)
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {}

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
