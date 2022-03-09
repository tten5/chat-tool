<template>
    <!-- <div class="bg-light header d-flex align-items-center justify-content-between mb-5">
            <h4 class="my-auto header-text"> Chat-tool </h4>
            <button v-if="!currentUser" class="btn btn-outline-dark"> Log out </button>
    </div> -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand header-text text-center">Chat-tool</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <div v-if="!currentSocket" class="nav-link active" aria-current="page" @click="home">Home</div>
                    </li>
                    <li class="nav-item">
                        <div v-if="isLoggedIn && !currentSocket"> 
                            <div class="nav-link active" aria-current="page" @click="lounge"> Lounge </div>
                        </div>
                    </li>
                    
                </ul>
                
                <button v-if="isLoggedIn && !currentSocket" @click="logout" class="btn btn-outline-dark" to="/"> 
                    Logout 
                </button>

            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Header',
        emits: ["logout"],
        props: ['isLoggedIn', 'currentSocket'],
        data() {
            return {

            }
        },
        methods: {
            home() {
                this.$router.push('/')
            },
            lounge() {
                this.$router.push('/lounge')
            },
            logout() {
                localStorage.removeItem('username')
                // this.currentSocket.disconnect()
                this.$emit('logout')
                this.$router.push('/')
            }
        },
        mounted() {
            // if(localStorage.username) {
            //     this.isLoggedIn = true
            // } else {
            //     this.isLoggedIn = false
            // }
        }
    }
</script>

<style>
    .header-text {
        font-weight: 600;
        /* color: gray !important;  */
    }

    .header {
        height: 80px;    
    }

    .nav-item:hover {
        cursor: pointer;
    }
</style>