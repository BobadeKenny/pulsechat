import * as SecureStore from "expo-secure-store";

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

async function customFetch(url, method = "GET", body = null) {
  const BASE_API_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
  try {
    const refreshToken = await SecureStore.getItemAsync("refresh");

    if (refreshToken != null) {

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

      const accessToken = tokens.access;
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
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export { customFetch, saveTokens, deleteTokens };
