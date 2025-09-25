import { Text } from "react-native";

import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRouter } from "expo-router";

const UserOnly = ({ children }) => {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user === null) {
      router.replace("/auth/login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return <Text>Loading</Text>;
  }

  return children;
};

export default UserOnly;
