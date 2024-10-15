// navbar_script.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from './firebase_init.js'; // Import the app from firebase_init.js

const auth = getAuth(app); // Pass the app instance to getAuth()

function updateUserProfile() {
  const userProfileDiv = document.getElementById('userProfile');
  const mainLoginBtn = document.getElementById('main-login-btn');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      const userDetails = `
        <img src="${user.photoURL}" alt="Profile Picture" >
      `;
      userProfileDiv.innerHTML = userDetails;
      userProfileDiv.style.display = "flex"; // Show user profile
      mainLoginBtn.style.display = "none"; // Hide main login button
    } else {
      // No user is signed in
      userProfileDiv.style.display = "none"; // Hide user profile
      mainLoginBtn.style.display = "block"; // Show main login button
    }
  });
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
  updateUserProfile();
});
