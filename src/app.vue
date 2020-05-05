<script>
import RightPanel from './components/right-panel.vue'

export default {
  name: 'App',

  components: {
    'right-panel': RightPanel
  },

  data() {
    return {
      // Currently selected tab
      tab: 'home',
      // Visibility of panels
      leftPanel: true,
      rightPanel: true
    }
  },

  created() {
    console.log('Ready.')
  }
}
</script>

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="leftPanel = !leftPanel" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          Flooid
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="rightPanel = !rightPanel" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftPanel" side="left" width="200" bordered>
      <q-tabs
        v-model="tab"
        vertical
        class="text-teal"
      >
        <q-route-tab name="home" icon="home" label="Home" to="/" />
        <q-route-tab name="alarms" icon="alarm" label="Alarms" to="/alarms" />
        <q-route-tab name="movies" icon="movie" label="Movies" to="/movies" />
      </q-tabs>
    </q-drawer>

    <q-drawer show-if-above v-model="rightPanel" side="right" bordered>
      <right-panel></right-panel>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>

</template>

<style lang="scss">
</style>
