<script>
  import LoginDialog from './components/login-dialog.vue'
  import Menu from './components/menu.vue'
  import { DataService, Session } from './services'

  export default {
    name: 'App',

    components: {
      'login-dialog': LoginDialog,
      'application-menu': Menu
    },

    data () {
      return {
        console,
        Session,
        summary:[],
        // Visibility of panels
        leftPanel: true,
        // Visibility of log in dialog
        loginWindow: false
      }
    },

    computed: {
    },

    methods: {
      login () {
        Session.startLogin()
      },

      logout () {
        Session.logout()
        DataService.reset()
        this.$router.push({ path: '/' })
      },

      toggleLeftPanel () {
        this.leftPanel = !this.leftPanel
      }
    }
  }

</script>

<template>
  <div class="container">

    <login-dialog></login-dialog>

    <q-layout view="hHh lpR fFf">

      <q-header elevated class="text-black" style="background-color: #00b3b3">
        <q-toolbar>
          <q-btn dense flat round icon="menu" @click="toggleLeftPanel()" />

          <q-toolbar-title>
            <img alt="Fluid logo" src="assets/fluid-logo.png" width="125" height="55">
          </q-toolbar-title>

          <q-btn v-if="Session.isLoggedOut" class="button-log-in" @click="login()">Log in</q-btn>
          <q-btn v-if="Session.isLoggedIn" class="button-log-out" @click="logout()">Log out</q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftPanel" side="left" :width="200" bordered>
        <application-menu>
        </application-menu>
      </q-drawer>

      <!--
      1. Summary starts empty = no tree is generated
      2. If user logs in, summary is retrieved
      3. if the user successfully logs in and there is a new retrieved summary, draw the tree
      4. Literally no clue how to watch for the data change in an other file.

      nodes prop could be generated programatically above?
      -->

      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>



<style lang="scss">
  .container {
    width: 100%;
    height: 100%;

    .q-header .q-layout__shadow:after {
      bottom: 0px;
    }

    .q-menu {
      box-shadow: none;
    }
  }

  .button-log-in{
    background-color: whitesmoke;
  }

  .button-log-out{
    background-color: whitesmoke;
  }
</style>
