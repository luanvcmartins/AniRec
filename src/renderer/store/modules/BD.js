import fs from 'fs'
import Vue from 'vue'

const state = {
    hasLoaded: false,
    feedback: [],
    animes: [],
    genres: ['Cars', 'Yuri', 'Magic', 'Comedy', 'Josei', 'Yaoi', 'Demons', 'Shoujo_Ai', 'Psychological', 'Mecha', 'Seinen', 'Vampire', 'Shounen_Ai', 'Action', 'Adventure', 'School', 'Martial_Arts', 'Samurai', 'Space', 'Fantasy', 'Slice_of_Life', 'Shoujo', 'Military', 'Super_Power', 'Ecchi', 'Shounen', 'Horror', 'Harem', 'Romance', 'Kids', 'Music', 'Game', 'Historical', 'Thriller', 'Police', 'Supernatural', 'Sci-Fi', 'Drama', 'Sports', 'Mystery', 'Parody', 'Dementia']
}

const mutations = {
    feedback(state, item) {
        Vue.set(state.feedback, item["id"], item);
    },

    loadFeedback(state, feedback) {
        state.feedback = feedback
    },

    loadAnimes(state, animes) {
        state.animes = animes
    },

    loaded(state) {
        state.hasLoaded = true;
    }
}

const actions = {

    init({
        state,
        dispatch,
        commit
    }) {
        return new Promise((resolve, reject) => {
            if (!state.hasLoaded)
                dispatch("load").catch(() => {
                    reject();
                }).then(() => {
                    resolve();
                    commit("loaded");
                })
            else resolve();
        })
    },

    likeAnime({
        dispatch,
        commit,
        state
    }, item) {
        if (state.feedback[item] != undefined && state.feedback[item].rating == 1) {
            // This is the current rating already, we will disable it then:
            commit("feedback", {
                id: item,
                type: "anime",
                rating: 0
            })
        } else {
            //This is a new rating:
            commit("feedback", {
                id: item,
                type: "anime",
                rating: 1
            })
        }

        dispatch("save")
    },

    dislikeAnime({
        dispatch,
        commit,
        state
    }, item) {
        if (state.feedback[item] != null && state.feedback[item].rating == -1) {
            // This is the current rating already, we will disable it then:
            commit("feedback", {
                id: item,
                type: "anime",
                rating: 0
            })
        } else {
            //This is a new rating:
            commit("feedback", {
                id: item,
                type: "anime",
                rating: -1
            })
        }

        dispatch("save")
    },

    likeGenre({
        dispatch,
        commit
    }, item) {
        if (state.feedback[item] != null && state.feedback[item].rating == 1) {
            commit("feedback", {
                id: item,
                type: "genero",
                rating: 0
            })
        } else {
            commit("feedback", {
                id: item,
                type: "genero",
                rating: 1
            })
        }
        dispatch("save")
    },
    dislikeGenre({
        dispatch,
        commit
    }, item) {
        if (state.feedback[item] != null && state.feedback[item].rating == -1) {
            commit("feedback", {
                id: item,
                type: "genero",
                rating: 0
            })
        } else {
            commit("feedback", {
                id: item,
                type: "genero",
                rating: -1
            })
        }
        dispatch("save")
    },

    load({
        commit,
        state
    }) {
        return new Promise((resolve, reject) => {
            let isDone = false;
            if (state.hasLoaded) {
                resolve();
            }
            fs.readFile("feedback.json", 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    reject();
                }
                commit("loadFeedback", JSON.parse(data));
                if (isDone) {
                    resolve()
                } else
                    isDone = true
            });
            fs.readFile("bd.json", 'utf-8', (err, data) => {
                if (err) {
                    alert("An error ocurred reading the file :" + err.message);
                    reject();
                }

                commit("loadAnimes", JSON.parse(data));
                if (isDone) {
                    resolve()
                } else
                    isDone = true
            });
        })

    },

    save({
        state
    }) {
        return new Promise((resolve, reject) => {
            let done = false
            fs.writeFile("feedback.json", JSON.stringify(state.feedback), function (err) {
                console.log("The file was saved!");
                if (done) resolve()
                else done = true
            });

            fs.writeFile("bd.json", JSON.stringify(state.animes), function (err) {
                if (done) resolve()
                else done = true
            });
        })

    }

}

export default {
    state,
    mutations,
    actions
}