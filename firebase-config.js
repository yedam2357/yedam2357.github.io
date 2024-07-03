// firebase-config.js

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCBUr426b4ZjegpcJ6-gvtirjI-TdsrZ7Y",
    authDomain: "test-67eeb.firebaseapp.com",
    projectId: "test-67eeb",
    storageBucket: "test-67eeb.appspot.com",
    messagingSenderId: "157964586912",
    appId: "1:157964586912:web:7b2926cd3bb1b152811ec5",
    measurementId: "G-TFF1H0SFXE"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);