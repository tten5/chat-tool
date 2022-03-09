<template>
  <Header :isLoggedIn="currentUser" :currentSocket="currentSocket" @logout="userLogout"/>

  <router-view :currentUser="currentUser" @login="userLogin" 
    @connectsocket="connectSocket" @disconnectsocket="disconnectSocket"></router-view>

</template>

<script>
import Header from './components/Header.vue'


export default {
  name: 'App',
  components: {
    Header,
  },

  data() {
    return {
      currentUser: null,
      currentSocket: null,
    } 
  },

  methods: {
    userLogin(username) {
      console.log("userLogin", username)
      this.currentUser = username
    },
    userLogout() {
      console.log("userLogout")
      this.currentUser = null
    },
    connectSocket(socket) {
      this.currentSocket = socket
    },
    disconnectSocket() {
      this.currentSocket = null

    }
  },
  beforeMount() {
    if(localStorage.username) {
      this.currentUser = localStorage.username
    } else {
      this.currentUser = null
    }
  },
}
</script>

<style>
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

.container {
  max-width: 800px !important;
}
</style>
