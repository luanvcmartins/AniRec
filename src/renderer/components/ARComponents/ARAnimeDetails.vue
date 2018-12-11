<template>

  <v-navigation-drawer v-if="anime != null" v-model="showing" absolute temporary right width="300" fixed style="top:0px;position:fixed;">
    <img class="details-img" height="400" v-if="anime.img !== null" :src="anime.img">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <span class="display-1">{{anime.main_title}}</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <span class="body-1">{{anime.desc}}</span>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-chip v-for="genre in anime.genres" :key="genre">
            {{genre}}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-container>


  </v-navigation-drawer>
</template>
<script>
  export default {
    name: 'ar-anime-details',
    data: function () {
      return {
        showing: false
      }
    },
    methods: {
      show: function () {
        this.showing = true
      }
    },
    watch: {
      anime: function (e) {
        this.showing = true;
      }
    },
    props: ['anime']
  }
</script>
<style scoped>
  .details-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    /* Do not scale the image */
    object-position: center;
    /* Center the image within the element */
  }
</style>