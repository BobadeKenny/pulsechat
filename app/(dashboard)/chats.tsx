import { FlatList, Pressable, StyleSheet, useColorScheme } from "react-native";

import Spacer from "../../components/Spacer";
import ThemedText from "../../components/ThemedText";
import ThemedView from "../../components/ThemedView";
import ThemedCard from "../../components/ThemedCard";
import { useRooms } from "../../hooks/useRooms";
import { Colors } from "../../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../components/Button";
import { useRouter } from "expo-router";

const Chats = () => {
  const { userRooms } = useRooms();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter()
  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedView
        style={styles.header}
        className="sticky top-0 flex justify-between"
      >
        <ThemedText
          title={true}
          style={styles.heading}
          className="text-xl font-bold"
        >
          Chatrooms
        </ThemedText>
        <Button
          onPress={() => {
            router.push("/create");
          }}
          className="flex h-10 w-10 items-center justify-center"
        >
          <Ionicons size={30} name={"add-circle"} color={theme.iconColor} />
        </Button>
      </ThemedView>
      <Spacer />

      <FlatList
        data={userRooms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/chats/${item.id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.name}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    // textAlign: "center",
  },
  list: {
    marginTop: 40,
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4,
    padding: 10,
    paddingLeft: 14,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
