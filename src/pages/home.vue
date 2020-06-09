<script>
  import { DataService, Session } from '../services'

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
      <label class="text-h3">Welkom bij de Fluid organisatie groeiscan questionaire!</label>
      <br>
      <label class="text-h6">Uitleg</label>
      Vul eerst de <b>naam</b> van het bedrijf waar je in werkt en daarna de <b>afdeling</b>.

      Vervolgd lees per thema de 5 stellingen.
      Kruis aan in de eerste kolom welke stelling het meest overeenkomen met hoe het nu is in het organisatie(onderdeel), dat je wilt onderzoeken. Selecteer dus in de eerste kolom 1 bolletje.
      Selecteer in de tweede kolom één stelling aan, die aangeeft wat in jouw organisatie(onderdeel) méér aandacht zou mogen krijgen.

    </label>
  </div>
</template>

<style lang="scss" scoped>
</style>
