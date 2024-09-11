// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFCBVB2keE9mH6T8Lz8EehkqSwSBcNCEE",
  authDomain: "signin-test-51c74.firebaseapp.com",
  projectId: "signin-test-51c74",
  storageBucket: "signin-test-51c74.appspot.com",
  messagingSenderId: "817569168873",
  appId: "1:817569168873:web:2b1652a850e046fbd89f78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
let login = document.getElementById("login");

//  login.addEventListener("click", (e) => {
//    signInWithRedirect(auth, provider);
//    getRedirectResult(auth)
//      .then((result) => {
//        // This gives you a Google Access Token. You can use it to access Google APIs.
//        const credential = GoogleAuthProvider.credentialFromResult(result);
//        const token = credential.accessToken;

//        // The signed-in user info.
//        const user = result.user;
//        // IdP data available using getAdditionalUserInfo(result)
//        // ...
//      })
//      .catch((error) => {
//        // Handle Errors here.
//        const errorCode = error.code;
//        const errorMessage = error.message;
//        // The email of the user's account used.
//        const email = error.customData.email;
//        // The AuthCredential type that was used.
//        const credential = GoogleAuthProvider.credentialFromError(error);
//        // ...
//      });
//  });

login.addEventListener("click", (e) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      //name=displayName
      //email  = email
      //photo = photoURL
      alert(user.displayName);
      console.log(user);
      // alert(user.photoURL);
      
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      alert(errorMessage);
    });

    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    
});


//   const client = google.accounts.oauth2.initCodeClient({
//     client_id: '359826316581-0hiujuhv1ue88ld56g1m5nvl2ce3cbg7.apps.googleusercontent.com',
//     scope: 'https://www.googleapis.com/auth/calendar.readonly',
//     ux_mode: 'redirect',
//     redirect_uri: "https://your.domain/code_callback_endpoint",
//     state: "YOUR_BINDING_VALUE"
//   });






// Signin Google
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
alert(profile.getName());
  $("#name").text(profile.getName());
  $("#email").text(profile.getEmail());
  $("#image").attr('src',profile.getImageUrl());
  $(".data").css("display","block");
  $(".g-signin2").css("display","none")
}



/* <a href="#" onclick="signOut();">Sign out</a> */

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {

      console.log('User signed out.');
      alert("User signed out. !!")

      $(".g-signin2").css("display","block")
      $(".data").css('display',"none");
    });
  }
