<template>
  <div id="app">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css">
    <v-app dark>
      <v-navigation-drawer fixed v-model="drawer" app>
        <v-list>
          <v-list-tile router exact to="/">
            <v-list-tile-action>
              <v-icon>home</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router exact to="/recommendation">
            <v-list-tile-action>
              <v-icon>new_releases</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Recommendation</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router exact to="/animes">
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Animes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile router exact to="/feedback">
            <v-list-tile-action>
              <v-icon>favorite_border</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Known animes</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar color="cyan darken-3" dark fixed app>
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>AniRec</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-content>
      <v-footer app>
        <v-spacer></v-spacer>
        <span style="padding-right:16px" class="grey--text">Mineração de Dados não estruturados &copy; 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  export default {
    name: 'teste1',
    data: () => ({
      drawer: false
    }),
    mounted: function () {
      if (this.drawer == false)
        setTimeout(() => {
          this.drawer = true;
        }, 2500)
    }
  }
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
  /* Global CSS */
</style>