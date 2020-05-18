<script>

export default {
  name: 'App',

  data() {
    return {
      // Currently selected tab
      tab: 'home',
      // Visibility of panels
      leftPanel: true
    }
  },

  created() {
    console.log('Ready.')
  }
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-black" style="background-color: #00b3b3">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftPanel = !leftPanel" />

        <q-toolbar-title>
          <img alt="Fluid logo" src="./statics/logo/Fluid_logo_Transparant.png" width="125" height="55">
        </q-toolbar-title>

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
        <q-route-tab name="results" icon="assignment_turned_in" label="Results" to="/results" />
        <q-btn-dropdown name="summary" flat style="width: 100%" icon="assignment" label="Summary">
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

</template>

<style lang="scss">
  .q-header .q-layout__shadow:after {
    bottom: 0px;
  }

  .q-menu{
    box-shadow: none;
  }
</style>
