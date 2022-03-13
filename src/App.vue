<template>
  <div id="app">
    <Header :user="user"/>
    <b-container>
      <router-view :user="user"/>
    </b-container>
    <Footer :user="user"/>
  </div>
</template>

<script>
import Header from './views/Header.vue'
import Footer from './views/Footer.vue'

export default {
  data(){
    return {
      user: null
    }
  },
  components: {
    Header,
    Footer
  },
  created(){
    this.$store.watch((state, getters) => getters.auth, () => {
      this.user = this.$store.getters.status
    })
    try {
      let loggedInOrNot = JSON.parse(localStorage.getItem('dsite'))
      if(loggedInOrNot && loggedInOrNot.alias && loggedInOrNot.token && Date.now() - loggedInOrNot.timer < 43200000){
        // this.user = loggedInOrNot
        this.$store.dispatch('auth', loggedInOrNot)
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
