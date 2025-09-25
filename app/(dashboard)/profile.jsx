import { StyleSheet, Text } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import { useUser } from "../../hooks/useUser";

import Button from "../../components/Button";

const Profile = () => {
  const { logout, user } = useUser();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        {user.email}
      </ThemedText>
      <Spacer />

      <ThemedText>Time to start reading some books...</ThemedText>
      <Spacer />
      <Button onPress={handleLogout}>
        <Text style={{ color: "#f2f2f2" }}>Logout</Text>
      </Button>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
