import { StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedView from '../../../components/ThemedView';
import ThemedText from '../../../components/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { useRooms } from '../../../hooks/useRooms';
import ThemedLoader from '../../../components/ThemedLoader';

const Chat = () => {
    const [room, setRoom] = useState(null)
    const {id} = useLocalSearchParams()
    const {getRoomDetails} = useRooms() 

    useEffect(() => {
    async function loadRoom() {
        const roomData = await getRoomDetails(id)
        setRoom(roomData)
    }
    loadRoom()
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
      <ThemedText>Created by {room.owner}</ThemedText>
    </ThemedView>
  );
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch"
    }
})