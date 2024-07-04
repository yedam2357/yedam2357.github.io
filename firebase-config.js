// firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCBUr426b4ZjegpcJ6-gvtirjI-TdsrZ7Y",
  authDomain: "test-67eeb.firebaseapp.com",
  projectId: "test-67eeb",
  storageBucket: "test-67eeb.appspot.com",
  messagingSenderId: "157964586912",
  appId: "1:157964586912:web:7b2926cd3bb1b152811ec5",
  measurementId: "G-TFF1H0SFXE",
  databaseURL: "https://test-67eeb-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
