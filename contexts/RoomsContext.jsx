import { createContext, useEffect, useState } from "react";
import { customFetch } from "../utils/FetchUtils";


export const RoomsContext = createContext()

export function RoomsProvider({children}){
    const [rooms, setRooms] = useState([])
    const [userRooms, setUserRooms] = useState([])

    async function getRooms() {
        try {
            const response = await customFetch("rooms/", "GET")
            setRooms(response.results)

        } catch (error) {
            console.log(error)
        }
    }

    async function getUserRooms() {
        try {
          const response = await customFetch("rooms/my-rooms/", "GET");
          setUserRooms(response);
        } catch (error) {
          console.log(error);
        }
    }

    
    async function getRoomDetails(id) {
        try {
            const resp = await customFetch(`rooms/${id}/`)
            return resp 
        } catch (error) {
            console.log(error)
        }
    }

    async function getRoomMessages(id) {
        try {
            const messages = await customFetch(`rooms/${id}/messages/`)
            return messages.results
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(() => {
        getRooms();
        getUserRooms();
    }, [])

    return (
        <RoomsContext.Provider value={{ rooms, getRooms, getRoomDetails, getRoomMessages, getUserRooms, userRooms }}>
            {children}
        </RoomsContext.Provider>
    )

}