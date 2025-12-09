import {
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import { useLocalSearchParams } from "expo-router";
import { useRooms } from "../../../hooks/useRooms";
import ThemedLoader from "../../../components/ThemedLoader";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { refreshAccessToken } from "../../../utils/FetchUtils";

const Chat = () => {
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState(null);
  const { id } = useLocalSearchParams();
  const { getRoomDetails, getRoomMessages } = useRooms();
  const [text, setText] = useState("");

  const ws = useRef(null);

  async function connectToServer() {
    const accessToken = await refreshAccessToken();
    ws.current = new WebSocket(
      `${process.env.EXPO_PUBLIC_WEBSOCKET_URL}${id}/`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    ws.current.onopen = () => {
      console.log("connected");
    };
    ws.current.onmessage = (e) => {
      console.log(e.data);
    };
  }

  async function sendMessage() {
    ws.current.send(
      JSON.stringify({
        message: text,
      })
    );
    setText("");
    messages.push({
      content: text,
      id: Date.now(),
    });
    console.log(messages);
  }

  useEffect(() => {
    async function loadRoom() {
      const roomData = await getRoomDetails(id);
      setRoom(roomData);
    }
    async function loadMessages() {
      const messages = await getRoomMessages(id);
      setMessages(messages);
    }
    loadRoom();
    loadMessages();
    connectToServer();
  }, [id]);
  if (!room) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView safe={true} style={styles.container}>
        <ThemedText>Chat - {id}</ThemedText>
        <ThemedView>
          {!messages ? (
            <ThemedLoader />
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.list}
              renderItem={({ item }) => <ThemedText>{item.content}</ThemedText>}
            />
          )}
        </ThemedView>
        <Input
          style={{ width: "80%", marginBottom: 20 }}
          keyboardType="default"
          onChangeText={setText}
          value={text}
        />
        <Button onPress={sendMessage}>
          <Text style={{ color: "#f2f2f2" }}>Submit</Text>
        </Button>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    alignItems: "stretch",
  },
});
