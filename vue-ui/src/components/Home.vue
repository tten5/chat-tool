<template>

  <div class="masthead">
    <div class="container h-100">
      <div class="row h-100 align-items-center">
        <div class="col-12 text-center">
          
          <div v-if="!currentUser">
            <h1 class="fw-light">Welcome</h1>
            <p class="lead">Please log in to continue</p>
            <a class="btn btn-outline-dark col-3 mt-3" href="/login"> Login </a>
            <p class="mt-3"> or </p>
            <a class="btn btn-outline-dark col-3 mt-2" href="/register"> Sign up </a>
          </div>

          <div v-else>
            <h1 class="fw-light">You are logged in</h1>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Home',
  props: ['currentUser'],
  
  data() {
    return {
      // isLoggedIn: false
    }
  },

  methods: {
    
  },
  // beforeMount() {
  //   if(localStorage.username) {
  //     this.isLoggedIn = true
  //   } else {
  //     this.isLoggedIn = false
  //   }
  // }

}
</script>



<style>
.masthead {
  height: 80vh;
  min-height: 400px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

</style>
