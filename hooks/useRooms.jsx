import { useContext } from "react";

import { RoomsContext } from "../contexts/RoomsContext";

export function useRooms(){
    const context = useContext(RoomsContext)
     
    if (!context) {
        throw new Error("useRooms must be used within a RoomProvider")

    }

    return context
}