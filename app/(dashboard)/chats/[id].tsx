import { StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../../components/ThemedView';
import ThemedText from '../../../components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { useRooms } from '../../../hooks/useRooms';
import ThemedLoader from '../../../components/ThemedLoader';

const Chat = () => {
    const [room, setRoom] = useState(null)
    const [messages, setMessages] = useState(null)
    const {id} = useLocalSearchParams()
    const {getRoomDetails, getRoomMessages} = useRooms() 

    useEffect(() => {
    async function loadRoom() {
        const roomData = await getRoomDetails(id)
        setRoom(roomData)
    }
    async function loadMessages() {
        const messages = await getRoomMessages(id)
        setMessages(messages)
    }
    loadRoom()
    loadMessages()
    }, [id])
    if (!room){
        return (
            <ThemedView safe={true} style={styles.container}>
                <ThemedLoader/>
            </ThemedView>
        )
    }
  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedText>Chat - {id}</ThemedText>
      <ThemedView>
        {!messages ? (
            <ThemedLoader/>
        ) : <FlatList data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
            <ThemedText>{item.content}</ThemedText>
        )}
        />}
        
      </ThemedView>
      </ThemedView>
  );
}

export default Chat

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});