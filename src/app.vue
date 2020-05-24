<script>
  import LoginDialog from './components/login-dialog.vue'
  import { Session } from './services'

  export default {
    name: 'App',

    components:{
      'login-dialog': LoginDialog
    },

    data() {
      return {
        Session,
        // Currently selected tab
        tab: 'home',
        // Visibility of panels
        leftPanel: true,
        // Visibility of log in dialog
        loginWindow : false
      }
    },

    methods: {
      login () {
        Session.startLogin()
      },

      logout () {
        Session.logout()
      },

      toggleLeftPanel () {
        this.leftPanel = !this.leftPanel
      }
    },

    created() {
      console.log('Ready.')
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
            <img alt="Fluid logo" src="./statics/logo/Fluid_logo_Transparant.png" width="125" height="55">
          </q-toolbar-title>

          <q-btn v-if="Session.isLoggedOut" class="button-log-in" @click="login()">Log in</q-btn>
          <q-btn v-if="Session.isLoggedIn" class="button-log-out" @click="logout()">Log out</q-btn>
        </q-toolbar>
      </q-header>

      <q-drawer show-if-above v-model="leftPanel" side="left" :width="200" bordered>
        <q-tabs
          v-model="tab"
          vertical
          class="text-black"
        >
          <q-route-tab name="home" icon="home" label="Home" to="/" />
          <q-route-tab name="survey" icon="home" label="Home" to="/survey" />
          <q-route-tab v-if="Session.isLoggedIn" name="results" icon="assignment_turned_in" label="Results" to="/results" />
          <q-btn-dropdown v-if="Session.isLoggedIn" name="summary" flat style="width: 100%" icon="assignment" label="Summary">
            <q-list id="dropdown-summary">
              <q-route-tab name="level-1" icon="widgets" label="Handy model" to="/summary" />
            </q-list>
          </q-btn-dropdown>
        </q-tabs>
      </q-drawer>

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
</style>
