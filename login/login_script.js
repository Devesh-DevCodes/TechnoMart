import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { app } from '/firebase_init.js'; // Import the app from firebase_init.js

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let login_btnMain = document.getElementById("main-login-btn");
let login_btnGoogle = document.getElementById("login-btn-google");
let logout_btnGoogle = document.getElementById("logout-btn-google");
let userProfile = document.getElementById('userProfile');  // nav
let userIdentity = document.getElementById('userDetails');

// Function to display user details
function displayUserDetails(user) {
  userIdentity.innerHTML = `
      <p>Name: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
      <p>Profile Picture:</p>
      <img src="${user.photoURL}" alt="Profile Picture" />
    `;
  userIdentity.style.display = "flex"; // Show user details
}

function displayUserProfile(user) {            // nav
  userProfile.innerHTML = `<img src="${user.photoURL}" alt="Profile Picture" />`;
  userProfile.style.display = "flex"; // Show user details
}

function updateUIForUser(isLoggedIn) {
  if (isLoggedIn) {
    login_btnMain.style.display = "none";
    login_btnGoogle.style.display = "none";
    logout_btnGoogle.style.display = "block";
  } else {
    userProfile.innerHTML = ''; // Clear user details
    userProfile.style.display = 'none'; // Hide user details in  nav
    userIdentity.style.display = 'none'; // Hide user details
    logout_btnGoogle.style.display = "none";
    login_btnGoogle.style.display = "block";
    login_btnMain.style.display = "block";
  }
}

// Sign in with Google using async/await
login_btnGoogle.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    displayUserProfile(user);
    updateUIForUser(true);
  } catch (err) {
    console.error("Error during sign-in:", err);
    alert("Sign-in failed. Please try again."); // Provide feedback to the user
  }
});

// Sign out using async/await
logout_btnGoogle.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
    updateUIForUser(false);
  } catch (err) {
    console.error("Error during sign-out:", err);
    alert("Sign-out failed. Please try again."); // Provide feedback to the user
  }
});

// Check the user's authentication state when the page loads
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    displayUserProfile(user);  // Nav
    displayUserDetails(user);   // Other section inside login page
    updateUIForUser(true);
  } else {
    console.log("No user is signed in");
    updateUIForUser(false);
  }
});



/*

  login_btnGoogle.addEventListener('click', ()=>{
    signInWithPopup(auth,provider).then((result) => {
      const user = result.user;
      login_btnGoogle.style.display="none";
      logout_btnGoogle.style.display="block";
      displayUserDetails(user);
  
      console.log(user.displayName);
  
    }).catch((err) => {
      console.log(err);
    });
  });

  logout_btnGoogle.addEventListener('click' , ()=>{
    signOut(auth).then(()=>{
      console.log('User signed out');
      userIdentity.innerHTML = '';
      logout_btnGoogle.style.display="none";
      login_btnGoogle.style.display="block";
    }).catch((err)=>{
      console.log(err);
    })
  });
*/


// validate 

// document.getElementById('login-form').addEventListener('submit', function(event) {

//     let name=document.getElementById('name').value;
//     // alert(name);
//     if(name.length<6){
//         alert("Username should be at least 6 characters !!");
//         event.preventDefault();
//     }

//     var password = document.getElementById('pwd').value;
//     if (password.length < 6) {
//       alert('Password should be at least 6 characters long !!');
//       event.preventDefault(); // Prevent form submission
//     }
//   });


// import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// import { app } from '/firebase_init.js'; // Import the app from firebase_init.js

// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// let login_btnMain = document.getElementById("main-login-btn");
// let login_btnGoogle = document.getElementById("login-btn-google");
// let logout_btnGoogle = document.getElementById("logout-btn-google");
// let userProfile = document.getElementById('userProfile');  // nav
// let userIdentity = document.getElementById('userDetails'); // login page

// // Function to display user details
// function displayUserDetails(user) {
//   userIdentity.innerHTML = `
//       <p>Name: ${user.displayName}</p>
//       <p>Email: ${user.email}</p>
//       <p>Profile Picture:</p>
//       <img src="${user.photoURL}" alt="Profile Picture" />
//     `;
//   userIdentity.style.display = "flex"; // Show user details
// }

// function displayUserProfile(user) {            // nav
//   userProfile.innerHTML = `<img src="${user.photoURL}" alt="Profile Picture" />`;
//   userProfile.style.display = "flex"; // Show user details
// }

// function isMobile() {
//   return /Mobi|Android/i.test(navigator.userAgent);
// }

// login_btnGoogle.addEventListener('click', () => {
//   if (isMobile()) {
//     signInWithRedirect(auth, provider);  // Redirect for mobile devices
//   } else {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         const user = result.user;
//         displayUserProfile(user);
//         displayUserDetails(user);
//       })
//       .catch((err) => {
//         console.error("Error during sign-in:", err);
//       });
//   }
// });

// // Check for redirect result when the page loads
// document.addEventListener('DOMContentLoaded', async () => {
//   const result = await getRedirectResult(auth);
//   if (result && result.user) {
//     const user = result.user;
//     displayUserProfile(user);
//     displayUserDetails(user);
//     login_btnMain.style.display = "none";
//     login_btnGoogle.style.display = "none";
//     logout_btnGoogle.style.display = "block";
//   } else {
//     console.log("No redirect result found.");
//   }
// });

// // Sign out the user
// logout_btnGoogle.addEventListener('click', async () => {
//   await signOut(auth);
//   console.log('User signed out');
//   userProfile.innerHTML = ''; // Clear user details
//   userProfile.style.display = 'none'; // Hide user profile
//   logout_btnGoogle.style.display = "none";
//   login_btnGoogle.style.display = "block";
//   login_btnMain.style.display = "block";
// });

// // Check the user's authentication state when the page loads
// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     displayUserProfile(user);
//     displayUserDetails(user);
//     login_btnMain.style.display = "none";
//     login_btnGoogle.style.display = "none";
//     logout_btnGoogle.style.display = "block";
//   } else {
//     userProfile.innerHTML = '';
//     userProfile.style.display = 'none';
//     logout_btnGoogle.style.display = "none";
//     login_btnGoogle.style.display = "block";
//     login_btnMain.style.display = "block";
//   }
// });
