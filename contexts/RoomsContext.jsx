import { createContext, useEffect, useState } from "react";
import { customFetch } from "../utils/FetchUtils";


export const RoomsContext = createContext()

export function RoomsProvider({children}){
    const [rooms, setRooms] = useState([])

    async function getRooms() {
        try {
            const response = await customFetch("rooms/", "GET")
            setRooms(response.results)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getRooms();
    }, [])

    return (
        <RoomsContext.Provider value={{ rooms, getRooms }}>
            {children}
        </RoomsContext.Provider>
    )
}