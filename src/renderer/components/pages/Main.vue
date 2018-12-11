<template>
  <v-container fluid fill-height>
    <div id="particles-js" style="position:absolute; width:100%; height:100%;z-index:1"></div>
    <v-layout class="animated slideInDown" align-center row wrap>
      <v-flex xs12 class="text-xs-center">
        <span class="display-4 grey--text lighten-5">AniRec</span><br>
        <span class="display-1 grey--text lighten-3">Recommendation system</span><br>
        <span class="header grey--text lighten-3">Brucce N. dos Santos, Julio César Carnevali, Luan V. de C. Martins,
          Michael J. Bianchi
        </span><br>
      </v-flex>

    </v-layout>
  </v-container>
</template>
<script>
  import particles from 'particles.js'
  export default {
    name: 'index',
    data: function () {
      return {};
    },
    mounted() {
      particlesJS.load('particles-js', 'static/particlesjs-config.json', function () {});
    }
  }
</script>
<style scoped>
</style>