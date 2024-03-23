  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getDatabase , ref , set , push , onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCeJYZbjDx48r2hREaRRDn_xvG2yWOm0KQ",
    authDomain: "form-9749a.firebaseapp.com",
    projectId: "form-9749a",
    storageBucket: "form-9749a.appspot.com",
    messagingSenderId: "153721675359",
    appId: "1:153721675359:web:a433b19aba8c89ecca05ea"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
 console.log(app);
 console.log(db);

 var username  = document.getElementById("username");
 var email = document.getElementById("email");
 var message = document.getElementById("message");
 var div = document.getElementById("div");
 window.submitbtn = function () {
    var refr = push(ref(db , "Form"));
    var refkey = refr.key;
     var obj = {
        username: username.value,
        email: email.value,
        message: message.value
     }
     set(ref(db , `Form/${refkey}`), obj)
     .then(function (){
        alert('Submit Successful');
     })
     .catch(function (err) {
        alert('Submit Failed' + err.message)
     })

 };
 window.getData = function() {
    var dataRef = ref(db, "Form");
    onValue(dataRef, function(snapshot) {
        div.innerHTML = ''; // Clear previous data before appending new data
        snapshot.forEach(function(childSnapshot) {
            var formSubmission = childSnapshot.val();
            var jsonStr = JSON.stringify(formSubmission, null, 2); // Convert JSON object to string with formatting
            var pre = document.createElement('pre');
            var ptext = document.createTextNode(jsonStr);
            pre.appendChild(ptext);
            div.appendChild(pre); // Append each data entry to the specified div
        });
    });
}

window.getData(); // Call the function to retrieve and display data

