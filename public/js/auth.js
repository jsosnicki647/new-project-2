$(document).ready(() => {

    $("#check").on("click", () => {
        if (document.getElementById("check").checked) {
            $("#sign-up-creds").show()
        } else {
            $("#sign-up-creds").hide()
        }
    })

    $("#signup-login").on("click", (e) => {
        e.preventDefault()
        let email = $("#input-email").val().trim()
        let password = $("#input-password").val().trim()

        if (document.getElementById("check").checked) {
            auth.createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    const id = cred.user.uid
                    register(id)
                })
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then((cred) => {
                    const id = cred.user.uid
                    login(id)
                })
        }
    })

    $("#log-out").on("click", (e) => {
        e.preventDefault()
        auth.signOut()
            .then(() => {
                $("#username").html("")
                // $("#log-out").html("")
                $.get("/", () => {
                    $("#sign-up-creds").hide()
                    $("#log-out-p").hide()
                    window.location.href = window.location.origin
                })
            })
    })



    function register(id) {
        let newUser = {
            id: id,
            firstName: $("#first-name").val().trim(),
            lastName: $("#last-name").val().trim(),
            userName: $("#user-name").val().trim(),
            email: $("#input-email").val(),
            zip: $("#zip").val().trim(),
        }

        $.post("/api/adduser/", newUser, (data) => console.log(data))
            .then(login(id))
    }

    function login(id) {
        $.get("/profile/" + id, () => {
            window.location.href += "profile/" + id
            $.get("/api/user/" + id, ((data) => {
                $("#username").html("Welcome " + data[0].userName)
                $("#log-out").show()
            }))
        })
    }
})











//          $.ajax({
//                  url: queryURL,
//                  method: "GET"
//              })
//              .then((response) => {
//                  var lat = response.results[0].geometry.location.lat
//                  var lng = response.results[0].geometry.location.lng
//                  register(lat, lng)
//              })
//      } else {
//          const promise = auth.signInWithEmailAndPassword(email, password)
//          promise.catch((e) => {
//              console.log(e.code)
//          })
//          login()
//      }
//  })