<template>

  <div v-if="!currentRoom" class="container px-5">
    <h2 class="mt-5 mb-3"> {{ currentUser }} </h2>
    <hr>

    <!-- Create new room -->
    <div class="d-flex col-8 mt-5">
      <input v-model="roomName" type="text" placeholder="Room name" class="form-control">
      <button @click="createRoom" class="btn btn-outline-dark mx-3"> Create room </button>
    </div>

    <!-- show all room -->
    <h3 class="mt-5 mb-3"> Available Rooms </h3>
    <div class="d-flex">
      <div v-for="room in rooms" :key="room._id">
        <button @click="moveToRoom(room)" class="btn btn-outline-dark me-3">
          {{ room.roomName }}
        </button>
      </div>
    </div>

  </div>
  <div v-else class="container">
    <ChatBoard :roomName="currentRoom.roomName" :currentUser="currentUser" :socketInstance="socketInstance"
                @backtolounge="backToLounge" :key="currentRoom"/>
  </div>

</template>

<script>
import { getAllRooms, createRoom} from '../services/roomServices'
import ChatBoard from './ChatBoard.vue' 
import io from "socket.io-client";

export default {
  name: 'Lounge',
  components: {
    ChatBoard
  },
  props: ['currentUser'],
  emits: ['connectsocket', 'disconnectsocket'],
  
  data() {
    return {
      rooms: [],
      roomName: "",
      currentRoom: null,
      socketInstance: null,
    }
  },

  methods: {

    async getAllRooms() {
      this.rooms = await getAllRooms()
    },

    async createRoom() {
      const roomInfo = {
        roomName: this.roomName,
      }
      const room = await createRoom(roomInfo)
      if (room) {
        this.rooms.push(room)
      }
      this.roomName = ""
    },

    moveToRoom(roomInfo) {
      this.socketInstance = io("http://localhost:3000")
      this.currentRoom = roomInfo
      this.$emit('connectsocket', this.socketInstance)
    },

    backToLounge() {
      const data = {
        username: this.currentUser,
        roomName: this.currentRoom
      }
      this.socketInstance.disconnect(data)
      this.getAllRooms()
      this.currentRoom = null
      this.$emit('disconnectsocket')
    }
    
  },

  mounted() {
    this.getAllRooms()
  },

}
</script>



<style>

</style>
