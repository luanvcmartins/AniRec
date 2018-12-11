<template>
  <div style="height: 100%">
    <v-container v-if="isLoading" bg fill-height grid-list-md text-xs-center>
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center">
          <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-if="!isLoading && animes != null" fluid fill-height grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="id in query()" :key="id" xs12 sm6 md4 lg4 xl3>
          <ar-anime-card @click.native="showDetails(animes[id])" :anime="animes[id]"></ar-anime-card>
        </v-flex>
      </v-layout>
      <ar-anime-details :anime="showingAnime" ref="details"></ar-anime-details>
    </v-container>

  </div>
</template>
<script>
  import ARAnimeCard from './../ARComponents/ARAnimeCard'
  import ARAnimeDetails from './../ARComponents/ARAnimeDetails'
  import fs from 'fs';

  export default {
    name: 'animes',
    data: function () {
      return {
        showingDetails: true,
        showingAnime: {},
        currentPage: 0,
        pagination: 20,
        isLoading: true
      };
    },
    methods: {
      loadAnimes: function () {
        this.isLoading = true;
        console.log(this);
        this.$store.dispatch("load").then(() => {
          this.isLoading = false;
        })
      },

      showDetails: function (anime) {
        this.showingDetails = true;
        this.showingAnime = anime;
        this.$refs.details.show();
      },

      loadMore: function () {
        this.pagination += 20;
      },

      query: function () {
        return Object.keys(this.animes).slice(0, this.pagination);
      },

      range: function (min, max) {
        var array = [],
          j = 0;
        for (var i = min; i <= max; i++) {
          array[j] = i;
          j++;
        }
        return array;
      }
    },
    computed: {
      animes: function () {
        return this.$store.state.BD.animes;
      }
    },
    mounted: function () {
      console.log(fs);
      this.loadAnimes();
      console.log("Query: ", this.query());
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
  .detail-img {
    height: 400px;
    width: 100%;
  }
</style>