import axios from 'axios'

export async function getAllMsgs(roomName) {
    const response = await axios.get(`/api/msgs?roomName=${roomName}`);
    // console.log("getAllRooms", response.data)
    return response.data;
}
