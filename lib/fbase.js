import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyAyf1wwX4-_51Z7cjAFkq5inrsWspzYce0",
  authDomain: "rushcity-d71fe.firebaseapp.com",
  databaseURL: "https://rushcity-d71fe.firebaseio.com/",
  storageBucket: "gs://rushcity-d71fe.appspot.com",
};
firebase.initializeApp(config);

const database = firebase.database();

export const updateScore = (score) => {
  firebase.database().ref().set({ highScore: score});
};

export const callScore = () => {
   return firebase.database().ref().once('value').then((res) => {
    const highestScore = res.val().highScore;
    return highestScore;
  });
};
