import axios from 'axios'

export async function getAllRooms() {
    const response = await axios.get('/api/rooms');
    // console.log("getAllRooms", response.data)
    return response.data;
}

export async function createRoom(data) {
    if(data.roomName == "") {
        return null
    }
    const response = await axios.post(`/api/rooms`, {room: data});
    console.log("create new room", response.data.room)

    return response.data.room;
}

export async function deleteRoom(roomName) {
    const response = await axios.delete(`/api/rooms/${roomName}`);
    return response.data;
}
