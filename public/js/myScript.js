



firebase.auth().onAuthStateChanged(function(user) {
	let loginForm = document.getElementById('loginForm');
  	let profile = 	document.getElementById('profile');
  	let signup = document.getElementById('signup');

  if (user) {
  	console.log("logged in")

  	if(loginForm){
  		loginForm.style.display="none";
  	}

  	if(signup){
  		signup.style.display = "none";
  	}

     profile.style.display = "block";
    populateProfile();

  } 

});


// function populateProfile(){


// 	 let user = firebase.auth().currentUser;

let userID = user.uid;

// 	db.collection("users").where("id", "==", userID)
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             console.log(doc.id, " => ", doc.data());


//             document.getElementById('profileFirstName').innerText = doc.data().firstName;
//             document.getElementById('profileLastName').innerText = doc.data().lastName;
//             document.getElementById('profileUserName').innerText = doc.data().userName;
//             document.getElementById('profileZipCode').innerText = doc.data().zipCode;
//             document.getElementById('profileEmail').innerText = user.email;


//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });
	
// }

function login(){
	
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;

   
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then((data)=>{
		console.log(data);
		console.log("success");

	})
	.catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  let p = document.getElementById("errorMsg");
	  p.innerText = errorMessage;

	  document.getElementById("dangerDiv").style.display="block";
	  console.log("Error: "+errorMessage);
	  // ...
	});
}


function signup(){
	// let firstName = document.getElementById("firstname").value;
    // let lastName = document.getElementById("lastname").value;
    // let userName = document.getElementById("username").value;
    // let zipCode = document.getElementById("zipcode").value;


let email = document.getElementById("emailInput").value;
let password = document.getElementById("passwordInput").value;


	firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((data)=>{
     console.log(data);
// 	let user = data.user;
	    

// 	    db.collection("users").add({
// 		    firstName: firstName,
// 		    lastName: lastName,
// 		    zipCode: zipCode,
// 		    userName: userName,
// 		    id: user.uid
// 		})
// 		.then(function(docRef) {
// 		    console.log("Document written with ID: ", docRef.id);
// 		})
// 		.catch(function(error) {
// 		    console.error("Error adding document: ", error);
// 		});
// 	})
// 	.catch(function(error) {
// 	  // Handle Errors here.
// 	  var errorCode = error.code;
// 	  var errorMessage = error.message;
// 	  console.log("error: "+errorMessage);
// 	  // ...
// 	});
})}


