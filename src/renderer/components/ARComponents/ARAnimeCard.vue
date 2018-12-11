<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2} main`" class="mx-auto" width="344">
      <v-img v-if="anime.img !== null" :aspect-ratio="16/9" :src="anime.img"></v-img>
      <v-btn fab small :color="color(-1)" bottom @click.stop="dislike">
        <v-icon>thumb_down</v-icon>
      </v-btn>
      <v-btn fab small :color="color(1)" bottom @click.stop="like">
        <v-icon>thumb_up</v-icon>
      </v-btn>
      <v-card-title style="
    margin-top: -30px;
">
        <v-layout row wrap>
          <v-flex xs12>
            <span class="headline">{{anime.main_title}}</span>
            <div class="d-flex">
              <div class="ml-2 grey--text text--darken-2">
                <span>({{ anime.rating }})</span>
              </div>
            </div>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-hover>
</template>
<script>
  export default {
    name: 'ar-anime-card',
    methods: {
      like: function () {
        this.$store.dispatch("likeAnime", this.anime.id)
      },
      dislike: function () {
        this.$store.dispatch("dislikeAnime", this.anime.id)
      },
      color: function (expected) {
        if (this.rating != null) {
          if (this.rating.rating == expected) {
            return expected == 1 ? "green" : "red";
          }
        }
        return "gray"
      }
    },
    computed: {
      rating: function () {
        console.log(this.$store.state.BD.feedback[this.anime.id])
        return this.$store.state.BD.feedback[this.anime.id];
      }
    },
    props: {
      anime: {
        type: Object
      }
    }
  }
</script>
<style scoped>
  .main {
    cursor: pointer;
  }
</style>