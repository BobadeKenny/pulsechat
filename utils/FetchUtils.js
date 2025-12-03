import * as SecureStore from "expo-secure-store";

const BASE_API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

async function saveTokens(tokens) {
  if (tokens.access) {
    await SecureStore.setItemAsync("access", tokens.access);
  }
  if (tokens.refresh) {
    await SecureStore.setItemAsync("refresh", tokens.refresh);
  }
}

async function deleteTokens() {
  await SecureStore.deleteItemAsync("access");
  await SecureStore.deleteItemAsync("refresh");
}

async function refreshAccessToken() {
  const refreshToken = await SecureStore.getItemAsync("refresh");
  if (refreshToken) {
    try {
      const response = await fetch(`${BASE_API_URL}auth/token/refresh/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      });
      if (!response.ok) {
        error = await response.json();
        console.log(error);
        throw new Error("Failed");
      }

      const tokens = await response.json();
      await saveTokens(tokens);
      return tokens.access;
    } catch (error) {
      console.log("Error refreshing access token: ", error);
      return null;
    }
  } else {
    return null;
  }
}

async function customFetch(url, method = "GET", body = null) {
  try {
    const accessToken = await refreshAccessToken();
    if (!accessToken) {
      throw new Error("No access token available");
    }
    const resp = await fetch(`${BASE_API_URL}${url}`, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!resp.ok) {
      error = await resp.json();
      throw new Error(error);
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log("Fetch error: ", error);
    throw error;
  }
}

export { customFetch, saveTokens, deleteTokens };
