<template>
  <v-container bg fill-height grid-list-md text-xs-center fluid>
    <v-layout row wrap align-center v-if="isLoading">
      <v-flex class="text-xs-center">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!isLoading && animes != null">
      <v-flex v-for="id in query()" :key="id" xs12 sm6 md4 lg4 xl3>
        <ar-anime-card @click.native="showingAnime  = animes[id]" :anime="animes[id]"></ar-anime-card>
      </v-flex>
    </v-layout>
    <ar-anime-details :anime="showingAnime"></ar-anime-details>
  </v-container>
</template>
<script>
  import ARAnimeCard from '../ARComponents/ARAnimeCard';
  import ARAnimeDetails from '../ARComponents/ARAnimeDetails';
  export default {
    name: 'feedback',
    data: function () {
      return {
        isLoading: true,
        showingAnime: null,
        pagination: 20,
      }
    },
    methods: {
      loadAnimes: function () {
        this.isLoading = true;
        console.log(this);
        this.$store.dispatch("load").then(() => {
          this.isLoading = false;
        })
      },
      loadMore: function () {
        this.pagination += 20;
      },
      query: function () {
        return Object.keys(this.feedback).slice(0, this.pagination);
      },
    },
    computed: {
      animes: function () {
        return this.$store.state.BD.animes
      },
      feedback: function () {
        return this.$store.state.BD.feedback
      },
    },
    mounted() {
      this.loadAnimes()
      console.log(this.query())
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.offsetHeight - (document.body.scrollTop + window.innerHeight) <
          2;
        if (bottomOfWindow) {
          this.loadMore();
          console.log("Printing more");
        }
      };
    },
    components: {
      'ar-anime-card': ARAnimeCard,
      'ar-anime-details': ARAnimeDetails
    }
  }
</script>
<style scoped>
</style>