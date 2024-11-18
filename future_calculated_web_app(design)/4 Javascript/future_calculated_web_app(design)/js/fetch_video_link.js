// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCvgxDXMplnEUE_Uz0VwUu1BlEko3JgCB0",
    authDomain: "db001-f36e7.firebaseapp.com",
    databaseURL: "https://db001-f36e7-default-rtdb.firebaseio.com",
    projectId: "db001-f36e7",
    storageBucket: "db001-f36e7.appspot.com",
    messagingSenderId: "1067304932491",
    appId: "1:1067304932491:web:799eb1cd3e9db42130708e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Get a reference to the database

let coursesData = {}; // To hold all courses data for filtering

// Reference to the courses node
const dbRef = ref(db);