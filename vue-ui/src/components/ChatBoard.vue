<template>
  <h2 class="mt-5 mb-3"> {{ roomName }} </h2>
 
  <div class="card">
    <div class="card-body chat-board">
      <div class="d-flex mb-3" v-for="(message, index) in oldMsgs" :key="message._id" 
      :class="{ 'flex-row-reverse' : (message.sender == currentUser)}">
        <div>
          <b>
            {{ message.sender }}
          </b>
          <div class="card mt-2 old-msgs ps-2 pe-5 py-2">
            <div v-if="message.isShown">
              {{ message.content }}
            </div>
            <div v-else class="spoiler d-flex align-items-center" @click="toggleContent(index, true)">
              
              <div v-if="message.on">
                <i> Click to hide content </i>
                <hr>
                {{ message.content }}
              </div>
              <div v-else>
                <i> Click to show content </i>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="d-flex mb-3" v-for="(message, index) in messages" :key="message._id" 
      :class="{ 'flex-row-reverse' : (message.sender == currentUser)}">
        <div>
          <b>
            {{ message.sender }}
          </b>
          <div class="card mt-2 chat-msg ps-2 pe-5 py-2">
            <div v-if="message.isShown">
              {{ message.content }}
            </div>
            <div v-else class="spoiler d-flex align-items-center" @click="toggleContent(index, false)">
              <div v-if="message.on">
                <i> Click to hide content </i>
                <hr>
                {{ message.content }}
              </div>
              <div v-else>
                <i> Click to show content </i>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  </div>

   <!-- userName -->
  <h4 class="mt-5 mb-3"> <b> {{ currentUser }} </b> </h4>
  <!-- Add new msg -->
  <div class="mt-3">
    <div class="mb-2">
      <span class="ms-1 me-2"> Show message </span>
      <input v-model="isShown" type="checkbox" class="me-3">
    </div>
    <div class="d-flex">
      <input v-model="msg" type="text" placeholder="Enter messsage" class="form-control">
      <button @click="sendMessage" class="btn btn-outline-dark ms-3"> Send </button>
    </div>
  </div>

  <!-- back to lounge -->
  <div class="d-flex my-5">
    <button @click="backToLounge" class="btn btn-outline-dark me-3"> Back to waiting lounge </button>
    <!-- <button @click="editRoom" class="btn btn-outline-dark me-3"> Edit room </button> -->
    <button @click="deleteRoom" class="btn btn-outline-dark"> Delete room </button>
  </div>

</template>

<script>
import { getAllMsgs } from '../services/msgServices'
import { deleteRoom } from '../services/roomServices'


export default {
  name: 'ChatBoard',
  emits: ["backtolounge"],
  props: ['roomName','currentUser','socketInstance'],
  
  data() {
    return {
      msg: "",
      isShown: true,
      messages: [],
      oldMsgs : []
    }
  },

  methods: {

    async deleteRoom() {
      await deleteRoom(this.roomName)
    },

    // when there is a user join in room
    userJoinedRoom() {
      // console.log("Inside chat board")
      console.log("Username:", this.currentUser, " - Roomname:", this.roomName)

      // connect to socket server
      // this.socketInstance = io("http://localhost:3000")

      // When an user join chatroom, emit user object to server
      this.socketInstance.emit('joinroom', {
          username: this.currentUser,
          roomName: this.roomName
      }) 

      this.socketInstance.on('delete-room', () => {
        console.log("RoomId is deleted")
        this.backToLounge()
      })

      // when receive message 
      this.socketInstance.on(
        "server-msg", ({sender, content}) => {
          // console.log("Received msg from server")
          this.addMessage(sender, content, true)
        }
      )
      // when receive message 
      this.socketInstance.on(
        "chat-msg", (msg) => {
          this.addMessage(msg.sender, msg.content, msg.isShown)
        }
      )
    },

    // add message to messages array
    addMessage(sender, content, isShown) {
      const message = {
        _id: new Date().getTime(),
        sender,
        content,
        isShown
      };
      console.log("new message is", message)
      this.messages.push(message);
    },

    sendMessage() {
      if(this.msg != "") {
        // this.addMessage(this.currentUser, this.msg);
        let data = {
          username: this.currentUser,
          roomName : this.roomName,
          msgContent: this.msg,
          isShown : this.isShown,
        }
        this.socketInstance.emit('client-msg', data);
        this.msg = "";
        this.isShown = true;
        console.log("done send message")
      }
    },
    
    async getAllMsgs() {
      this.oldMsgs = await getAllMsgs(this.roomName) 
    },

    backToLounge() {
      this.socketInstance.emit('leftroom', {
        username: this.currentUser,
        roomName: this.roomName
      })
      this.messages = ""
      this.$emit('backtolounge')
    },

    toggleContent(msgIdx, oldMsg) {
      console.log(msgIdx)
      if(!oldMsg) {
        if(this.messages[msgIdx].on) {
          this.messages[msgIdx].on = !this.messages[msgIdx].on 
        } else {
          this.messages[msgIdx].on = true
        }
      } else {
        if(this.oldMsgs[msgIdx].on) {
          this.oldMsgs[msgIdx].on = !this.oldMsgs[msgIdx].on
        } else {
          this.oldMsgs[msgIdx].on = true
        }
      }

    }
  },
  mounted() {
    console.log("ChatBoard is activated")
    this.getAllMsgs()
    this.userJoinedRoom()
  }
  

}
</script>



<style>
.chat-board {
  min-height: 200px;
}

.old-msgs {
  background-color: lightgray
}

.chat-msg {
  background-color: lightblue;
}

.spoiler {
  color: gray;
}

.spoiler:hover {
  color: white;
  cursor: pointer
}

</style>
