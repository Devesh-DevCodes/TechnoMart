import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth , signInWithPopup, GoogleAuthProvider , signOut , onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDGw9RjkZgZYiyKTtgrPdS5Col9nCvb5WI",
  authDomain: "signin2-1b057.firebaseapp.com",
  projectId: "signin2-1b057",
  storageBucket: "signin2-1b057.appspot.com",
  messagingSenderId: "134491626520",
  appId: "1:134491626520:web:b00e25bf62b77f8921b76d",
  measurementId: "G-RQXT290EXZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

let login_btnMain = document.getElementById("main-login-btn");
let login_btnGoogle = document.getElementById("login-btn-google");
let logout_btnGoogle = document.getElementById("logout-btn-google");

let userProfile = document.getElementById('userProfile');  // nav
let userIdentity = document.getElementById('userDetails');


// Function to display user details
function displayUserDetails(user) {
  const userDetails = `
      <p>Name: ${user.displayName}</p>
      <p>Email: ${user.email}</p>
      <p>Profile Picture:</p>
      <img src="${user.photoURL}" alt="Profile Picture" />
    `;
  userIdentity.innerHTML = userDetails;
  userIdentity.style.display = "flex"; // Show user details
}
function displayUserProfile(user) {
  const userDetails = `
    <img src="${user.photoURL}" alt="Profile Picture" />
    `;
  userProfile.innerHTML = userDetails;
  userProfile.style.display = "flex"; // Show user details
}

// Sign in with Google using async/await
login_btnGoogle.addEventListener('click', async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    login_btnMain.style.display = "none";

    login_btnGoogle.style.display = "none";
    logout_btnGoogle.style.display = "block";
    displayUserProfile(user);
  } catch (err) {
    console.error("Error during sign-in:", err);
  }
});

// Sign out using async/await
logout_btnGoogle.addEventListener('click', async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
    userProfile.innerHTML = ''; // Clear user details
    userProfile.style.display = 'none'; // Hide user details
    logout_btnGoogle.style.display = "none";
    login_btnGoogle.style.display = "block";

    login_btnMain.style.display = "block";
  } catch (err) {
    console.error("Error during sign-out:", err);
  }
});

// Check the user's authentication state when the page loads
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    
    displayUserProfile(user);  //nav
    displayUserDetails(user);
    login_btnMain.style.display = "none";

    login_btnGoogle.style.display = "none";
    logout_btnGoogle.style.display = "block";
  } else {
    console.log("No user is signed in");
    userProfile.innerHTML = ''; // Clear user details
    userProfile.style.display = 'none'; // Hide user details
    logout_btnGoogle.style.display = "none";
    login_btnGoogle.style.display = "block";

    login_btnMain.style.display = "block";
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