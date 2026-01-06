import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import { useRooms } from '../../hooks/useRooms'
import { Colors } from '../../utils/Colors'
import ThemedCard from '../../components/ThemedCard'
import { useRouter } from 'expo-router'

const Create = () => {
  const {rooms} = useRooms()
  const colorScheme = useColorScheme;
  const theme = Colors[colorScheme] ?? Colors.light;
  const router = useRouter()
  return (
    <ThemedView style={styles.container}>
      <ThemedText title={true} style={styles.heading}>
        Create new room
      </ThemedText>
      <Spacer />
      <ThemedView>
        <ThemedText>Available Rooms</ThemedText>
        <FlatList
          data={rooms}
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
    </ThemedView>
  );
}

export default Create

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
