console.log('login')

$(document).ready(() => {

        $("#check").on("click", () => {
            if (document.getElementById("check").checked){
                $("#hide").show()
            }
            else{
                $("#hide").hide()
            }
        })

        $("#signup-login").on("click", (e) => {
            e.preventDefault()
            let email = $("#input-email").val()
            let password = $("#input-password").val()

            if (document.getElementById("check").checked){
                const promise = auth.createUserWithEmailAndPassword(email, password)
                promise.catch((e) => {
                    console.log(e.code)
                })

                var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $("#zip") + "&key=AIzaSyAidckZDfScayrad0X24a9nUStcfP_OvHc"

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                .then((response) => {
                    var lat = response.results[0].geometry.location.lat
                    var lng = response.results[0].geometry.location.lng
                    register(lat, lng)
                })
            }
            else{
                const promise = auth.signInWithEmailAndPassword(email, password)
                promise.catch((e) => {
                    console.log(e.code)
                })
                login()
            }
        })

        function login(){
            $.get("/profile/" + uid, () => window.location.href += "profile/" + uid)
            $.get("api/user/" + uid, (data) => console.log(data))
        }


        function register(lat, lng) {
            let newUser = {
                id: uid,
                firstName: $("#first-name").val().trim(),
                lastName: $("#last-name").val().trim(),
                userName: $("#user-name").val().trim(),
                email: $("#input-email").val(),
                zip: $("#zip").val().trim(),
                lat: lat.toFixed(3),
                lon: lng.toFixed(3)
            }
            
            $.post("/api/adduser", newUser, (data) => {
                console.log("UID HERE: " + uid)
                $.get("/profile/" + uid, () => window.location.href += "profile/" + uid)
                $.get("/api/user/" + uid, (data) => console.log("DATA: " + data))
            })

            
        }

        $("#check").on("click", () => {
            if ($("#signup-login").html() == "Log In"){
                $("#signup-login").html("Sign Up")
            }
            else{
                $("#signup-login").html("Log In")
            }
        })
})