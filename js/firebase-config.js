// js/firebase-config.js
// ご自身の Firebase コンソールから取得した設定に置き換えてください
const firebaseConfig = {
  apiKey: "AIzaSyAvYoFwpEtw9KnYWTKoS5H4wFwZNyVtV4k",
  authDomain: "minecraft-chatboard.firebaseapp.com",
  projectId: "minecraft-chatboard",
  storageBucket: "minecraft-chatboard.firebasestorage.app",
  messagingSenderId: "79345128432",
  appId: "1:79345128432:web:1f6806859431b730868335"
};
// 初期化
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
