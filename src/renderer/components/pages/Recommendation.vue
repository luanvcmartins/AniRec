<template>
  <v-container bg fill-height grid-list-md text-xs-center>
    <div id="particles-js" v-show="isLoading" style="position:absolute; width:100%; height:100%;z-index:9;" :class="loadingclass"></div>
    <v-layout v-if="isLoading" row wrap align-center :class="loadingclass">
      <v-flex class="text-xs-center">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular><br>
        <span class="body-2">Please wait, processing your request.</span>
      </v-flex>
    </v-layout>
    <v-layout v-if="!isLoading && (isRecommending && recommended.length > 0)" :class="recommendclass" align-center row
      wrap>
      <v-flex xs12><span class="display-2">Recomendations:</span><br>
        <span class="header grey--text darken-1">Based on the {{feedbackAmount}} animes you gave feedback on, we manage
          to find
          {{totalResults}}
          animes that you might like. The following is the top 50:</span>
      </v-flex>
      <v-flex xs12>
        <v-layout @mousewheel="scrollHorizontally" id="horizontal-scroll" class="horizontal-list" row
          align-content-center>
          <v-flex v-for="anime in recommended" :key="anime" px-1 pb-2 class="flex-0">
            <ar-anime-card @click.native="showingAnime = animes[anime]; 
        $refs.details.show();" :anime="animes[anime]"></ar-anime-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex x12>
        We need your opinion on the following items <v-btn depressed small color="primary" @click="switchViews">Feedback
          ></v-btn>
      </v-flex>
    </v-layout>
    <v-layout v-if="!isLoading && (!isRecommending || recommended.length == 0)" :class="feedbackclass" align-center row
      wrap>
      <v-flex xs12><span class="display-2">Tell us what you think</span><br>
        <span class="header grey--text darken-1">By rating the following animes, you will drastically improve the
          algorithms recommendations:</span>
      </v-flex>
      <v-flex xs12>
        <v-layout @mousewheel="scrollHorizontally1" id="horizontal-scroll1" class="horizontal-list" row
          align-content-center>
          <v-flex v-for="genre in genres" :key="genre" px-1 pb-2 class="flex-0">
            <v-chip light :color="getFeedbackColor(genre)">
              <v-btn @click="dislikeGenre(genre)" icon small>
                <v-icon>thumb_down</v-icon>
              </v-btn>{{genre}} <v-btn @click="likeGenre(genre)" icon small>
                <v-icon>thumb_up</v-icon>
              </v-btn>
            </v-chip>
          </v-flex>
        </v-layout>
        <v-layout @mousewheel="scrollHorizontally" id="horizontal-scroll" class="horizontal-list" row
          align-content-center>
          <v-flex v-for="id in label" :key="id" px-1 pb-2 class="flex-0">
            <ar-anime-card @click.native="showingAnime = animes[id];
        $refs.details.show();" :anime="animes[id]"></ar-anime-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex x12>
        <v-btn depressed small color="primary" @click="switchViews" v-if="recommended.length > 0">&lt;
          Recommended</v-btn>
      </v-flex>
    </v-layout>
    <v-fab-transition>
      <v-btn fab color="primary" style="margin-bottom: 42px;" bottom right absolute v-show="!isLoading" @click="run">
        <v-icon>cached</v-icon>
      </v-btn>
    </v-fab-transition>
    <ar-anime-details ref="details" :anime="showingAnime"></ar-anime-details>
  </v-container>
</template>
<script>
  import comm from './../../../resources/communication.js';
  import ARAnimeCard from './../ARComponents/ARAnimeCard.vue'
  import ARAnimeDetails from './../ARComponents/ARAnimeDetails.vue'
  import particles from 'particles.js'
  require("../../assets/animate.min.css")

  export default {
    name: 'recommendation',
    data: function () {
      return {
        isLoading: false,
        isRecommending: true,
        recommended: [],
        label: [],
        totalResults: 0,
        feedbackAmount: 0,
        showingAnime: null,
        loadingclass: ["animated"],
        recommendclass: ["animated"],
        feedbackclass: ["animated"],
        genres: ['Cars', 'Yuri', 'Magic', 'Comedy', 'Josei', 'Yaoi', 'Demons', 'Shoujo_Ai', 'Psychological', 'Mecha',
          'Seinen',
          'Vampire', 'Shounen_Ai', 'Action', 'Adventure', 'School', 'Martial_Arts', 'Samurai', 'Space', 'Fantasy',
          'Slice_of_Life', 'Shoujo', 'Military', 'Super_Power', 'Ecchi', 'Shounen', 'Horror', 'Harem', 'Romance',
          'Kids',
          'Music', 'Game', 'Historical', 'Thriller', 'Police', 'Supernatural', 'Sci-Fi', 'Drama', 'Sports',
          'Mystery', 'Parody',
          'Dementia'
        ]
      };
    },
    methods: {
      load() {
        this.$store.dispatch("load")
        this.run();
      },

      switchViews() {
        if (this.isRecommending) {
          this.recommendclass.push("fadeOut");
          setTimeout(() => {
            this.recommendclass.pop("fadeOut");
            this.isRecommending = false;
            this.feedbackclass.push("fadeIn")
            setTimeout(() => {
              this.feedbackclass.pop("fadeIn")
            })
          }, 500);
        } else {
          this.feedbackclass.push("fadeOut");
          setTimeout(() => {
            this.feedbackclass.pop("fadeOut");
            this.isRecommending = true;
            this.recommendclass.push("fadeIn")
            setTimeout(() => {
              this.recommendclass.pop("fadeIn")
            })
          }, 500);
        }
      },

      run() {
        this.isLoading = true;
        this.loadingclass.push("fadeIn")
        comm.obtainLabelsRequired(success => {
            this.label = success.feedback;
            this.recommended = success.recommended;
            this.isRecommending = true;
            this.recommendclass.push("fadeIn")

            this.feedbackAmount = success.total_feedback;
            this.totalResults = success.total_results;
            this.loadingclass.pop("fadeIn")
            this.loadingclass.push("fadeOut")
            setTimeout(() => {
              this.isLoading = false;
              this.loadingclass.pop("fadeOut")
            }, 500)
          },
          err => {
            console.log("error: ", err);
            this.isLoading = false;
          });
      },

      scrollHorizontally1(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('horizontal-scroll1').scrollLeft -= (delta * 320); // Multiplied by 40
        e.preventDefault();
      },
      scrollHorizontally(e) {
        e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        document.getElementById('horizontal-scroll').scrollLeft -= (delta * 320); // Multiplied by 40
        e.preventDefault();
      },

      getFeedbackColor(genre) {
        if (this.feedback[genre] == null) return "white"
        else if (this.feedback[genre].rating == 1) return "green"
        else if (this.feedback[genre].rating == 0) return "white"
        else return "red";
      },

      likeGenre(genre) {
        this.$store.dispatch("likeGenre", genre);
      },
      dislikeGenre(genre) {
        this.$store.dispatch("dislikeGenre", genre);
      }
    },
    computed: {
      animes: function () {
        return this.$store.state.BD.animes;
      },
      feedback: function () {
        return this.$store.state.BD.feedback;
      }
    },
    watch: {
      isLoading: function (v) {
        if (v) particlesJS.load('particles-js', 'static/particlesjs-config.json', function () {
          console.log('callback - particles.js config loaded');
        });
      }
    },
    mounted: function () {
      this.load();
    },
    components: {
      'ar-anime-card': ARAnimeCard,
      'ar-anime-details': ARAnimeDetails
    }
  }
</script>
<style scoped>
  .flex-0 {
    display: flex;
  }

  .horizontal-list {
    overflow: hidden;
  }
</style>