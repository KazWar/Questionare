<script>
import { Session } from '../services'

export default {
  name: 'Home',

  methods: {
    logout () {
      Session.logout()
    }
  }
}

</script>

<template>
  <div class="q-pa-lg">
    <label style="white-space:pre-wrap">
    Home

    Company will be selected here, navigation bar then changes.

    List:
    Company 1
    Company 2
      team 1
      team 2
    Company 3
      team 3


    </label>
  </div>
</template>

<style lang="scss" scoped>
</style>
