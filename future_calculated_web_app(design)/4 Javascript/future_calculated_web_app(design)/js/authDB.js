// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyCvgxDXMplnEUE_Uz0VwUu1BlEko3JgCB0",
   authDomain: "db001-f36e7.firebaseapp.com",
   projectId: "db001-f36e7",
   storageBucket: "db001-f36e7.appspot.com",
   messagingSenderId: "1067304932491",
   appId: "1:1067304932491:web:799eb1cd3e9db42130708e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Add event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', function () {

   // Check for login and register buttons in the DOM
   const submit = document.getElementById('login_btn');

   if (submit) {
      // Add event listener for the submit button
      submit.addEventListener("click", function (event) {
         event.preventDefault(); // Prevent the default form submission

         // Get input elements
         const email = document.getElementById('email').value;
         const password = document.getElementById('password').value;

         if (!email || !password) {
            alert("Please enter both email and password.");
            return;
         }

         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               // Signed in successfully
               const user = userCredential.user;
               alert("Logging in as: " + user.email);
               window.location.href = `home.html?user=${email}`;
            })
            .catch((error) => {
               const errorMessage = error.message;
               alert("Error: " + errorMessage);
            });
      });
   }

   // Check if the user is already logged in
   onAuthStateChanged(auth, (user) => {
      const signedInSection = document.querySelector('.signed .profile');
      const notSignedInSection = document.querySelector('.not_signed .profile');

      if (user) {
         // User is signed in, display the signed-in section
         notSignedInSection.style.display = 'none';
         signedInSection.style.display = 'block';
         document.querySelector('.signed .name').textContent = user.email;
      } else {
         // No user is signed in, display the sign-in prompt
         notSignedInSection.style.display = 'block';
         signedInSection.style.display = 'none';
      }
   });

   // Logout functionality
   const logoutBtn = document.querySelector('.signed .logoutBtn');
   if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
         signOut(auth).then(() => {
            // Sign-out successful
            alert("You have been logged out.");
            window.location.reloada(); // Refresh the page to reset the state
         }).catch((error) => {
            alert("Error: " + error.message);
         });
      });
   }
});
