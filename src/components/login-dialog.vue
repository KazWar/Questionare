<script>
  import { DataService, Session } from '../services'

  export default {
    name: 'login-dialog',

    data () {
      return {
        username: "",
        password: "",
        revealPassword: false,
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
                DataService.getSummary()
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
      <div style="width: 100%; text-align: center">
        <label style="font-size: large;">Survey admin login</label>
      </div>

          <q-input
            label="User name"
            name="username" v-model="username"
            outlined
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
            :type="revealPassword ? 'text' : 'password'"
            v-model="password"
            outlined
            lazy-rules
            :rules="[
              value => Boolean(value && value.trim()) || 'Password is required'
              ]">
              <template v-slot:append>
                <q-icon
                  :name="revealPassword ? 'visibility' : 'visibility_off'"
                  class="cursor-pointer"
                  @click="revealPassword = !revealPassword"
                />
              </template>
          </q-input>

      <div style="width: 100%">
        <q-btn style="width: 45%"
               @onClick="cancelLogin()"
               label="Cancel"
               color="primary"
               v-close-popup />
        <q-btn style="width: 45%; margin-left: 10px"
               label="Submit"
               color="primary"
               @click="tryLogin()" />
      </div>
    </q-form>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
</style>
