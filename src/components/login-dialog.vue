<script>
  import { Session } from '../services'

  export default {
    name: 'login-dialog',

    data () {
      return {
        username: null,
        password: null,
        Session
      }
    },

    methods: {
      tryLogin() {
        Session
            .login(this.username, this.password)
            .then(success => {
              if (success) {
                Session.finishLogin()
              }
            })
      },

      cancelLogin () {
        Session.finishLogin()
      }
    }
  }

</script>

<template>
  <q-dialog v-model="Session.isLoggingIn" persistent all-pointer-events>
    <q-card class="q-pa-md">
    <q-form ref="form" class="q-gutter-sm">
        Survey admin view

          <q-input
            label="User name"
            name="username" v-model="username"
            lazy-rules
            :rules="[
              value => Boolean(value && value.trim()) || 'User name is required',
              value => Boolean(value && value.length > 3) || 'User name is at least 3 characters'
            ]"
          >
          </q-input>

          <q-input
            label="Password"
            name="password"
            type="password"
            v-model="password"
            lazy-rules
            :rules="[
              value => Boolean(value && value.trim()) || 'Password is required'
            ]">
          </q-input>

        <q-btn @onClick="cancelLogin()" flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Submit" color="primary" @click="tryLogin()" />
    </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
</style>
