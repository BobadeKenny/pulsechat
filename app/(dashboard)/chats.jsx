import { FlatList, Pressable, StyleSheet } from 'react-native'

import Spacer from '../../components/Spacer'
import ThemedText from '../../components/ThemedText'
import ThemedView  from '../../components/ThemedView'
import ThemedCard from '../../components/ThemedCard'
import { useRooms } from '../../hooks/useRooms'
import { Colors } from '../../utils/Colors'

const Chats = () => {
  const {rooms} = useRooms()
  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Chats
      </ThemedText>
      <Spacer/>

      <FlatList
      data={rooms}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.list}
      renderItem={({item}) => (
        <Pressable>
          <ThemedCard style={styles.card}>
            <ThemedText style={styles.title}>{item.name}</ThemedText>
          </ThemedCard>
        </Pressable>
      )}
      />

    </ThemedView>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "90%",
    marginHorizontal:"5%",
    marginVertical:10,
    borderLeftColor: Colors.primary,
    borderLeftWidth:4,
    padding:10,
    paddingLeft: 14
  },
  title: {
    fontSize:20,
    fontWeight:"bold",
    marginBottom:10,
  }
})