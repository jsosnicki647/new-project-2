  console.log("HELLO")
  
  require('dotenv').config()
    const firebaseConfig = {
        apiKey: process.env.FB_KEY,
        authDomain: "bucket-besties.firebaseapp.com",
        databaseURL: "https://bucket-besties.firebaseio.com",
        projectId: "bucket-besties",
        storageBucket: "bucket-besties.appspot.com",
        messagingSenderId: "90867095766",
        appId: "1:90867095766:web:a446325a4f2c3709b8d177"
    }

    firebase.initializeApp(firebaseConfig)
    const auth = firebase.auth()

    var uid
    
    firebase.auth().onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
            console.log(firebaseUser)
            uid = firebaseUser.uid
        }
        else{
            console.log("not logged in")
        }
    })



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
            let success = true

            if (document.getElementById("check").checked){
                const promise = auth.createUserWithEmailAndPassword(email, password)
                promise.catch((e) => {
                    console.log(e.code)
                })

                var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + $("#zip") + "&key=" + process.env.API_KEY

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
            }
        })

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

            $.post("/api/adduser", newUser, (data) => console.log(data))

            
        }

        $("#check").on("click", () => {
            if ($("#signup-login").html() == "Log In"){
                $("#signup-login").html("Sign Up")
            }
            else{
                $("#signup-login").html("Log In")
            }
        })

        $.ajax({
            url:"/api/user/2",
            method: "GET"
        }).then((result) => $("#username").html("Welcome " + result[0].userName))

        

        $(".complete").on("click", (e) => {
            let id = $(e.target).data("id")
            $.put('/api/complete', {
                'userID': 2,
                'activityID': id,

            }, (result) => {
                console.log(result)
                location.reload()
            })
        })

        function _ajax_request(url, data, callback, method) {
            return jQuery.ajax({
                url: url,
                type: method,
                data: data,
                success: callback
            })
        }

        jQuery.extend({
            put: function (url, data, callback) {
                return _ajax_request(url, data, callback, 'PUT')
            }
        })

        $(".add-item-btn").on("click", () => {
            $("#results-modal").modal("toggle")
        })

        $(function(){
            $("#datepicker").datepicker()
        })

        $("#new-item-submit").on("click", (e) => {
            e.preventDefault()
            let date = $("#datepicker").val().trim()
            let deadline = date.substring(6,10) + "-" + date.substring(0,2) + "-" + date.substring(3,5)

            let newItem = {
                userid: 2,
                item: $("#item-input").val().trim(),
                type: $("#category-select").val().trim(),
                deadline: deadline
            }
            console.log(newItem)
            $.post("/api/newitem", newItem, (data) => {
                console.log(data)
                $("#results-modal").modal("toggle")
                location.reload()
            })
        })

        $(".find-friend").on("click", (e) => {
            let id = $(e.target).data("id")
            var activity = $(e.target).data("activity")
            console.log(id)
            $("#friends").html("")
            $.ajax({
                url:"/api/nearbyusers/2/" + id,
                method: "GET"
            }).then((result) => {
                if(result.length == 0){
                    let html = "No friends found!"
                    $("#friends").append(html)
                }
                else{
                    for (i=0; i<result.length; i++){
                        let html = '<li><button data-activity="' + activity + '" data-user="' + result[i].userName + '" class="more-margin contact btn btn-info btn-sm">Contact </button>' + result[i].userName + ": " + result[i].distance.toFixed(2) + ' miles </li>'
                        $("#friends").append(html)
                    }
                    $(".contact").on("click", (e) => {
                        e.preventDefault()
                        $("#friends-modal").modal("toggle")
                        $("#contact-modal").modal("toggle")
                        let friend = $(e.target).data("user")
                        $("#to-friend").val(friend)
                        $("#interest").val($(e.target).data("activity"))
                    })
                }
                $("#friends-modal").modal("toggle")
            })
        })

        $(".add-from-pop").on("click", (e) => {
            let newItem = {
                userid: 2,
                item: $(e.target).data("activity"),
                type: $(e.target).data("category"),
                deadline: "2019-12-31"
            }

            $.post("/api/newitem", newItem, (data) => {
                console.log(data)
                location.reload()
            })
        })
        
        $("#send-email").on("click", (e) => {
            e.preventDefault()
            let toUser = $("#to-friend").val()
            
            $.ajax({
                url:"/api/email/" + toUser,
                method: "GET"
            })
            .then((result) => {
                let newEmail = {
                    fromUser: "logged-in user",
                    email: result[0].email,
                    name: result[0].firstName,
                    message: $("#email-message").val(),
                    interest: $("#interest").val()
                }

                $.post("/form", newEmail).then((data) => {
                    if (data = "it's okay"){
                        $("#interest").val("")
                        $("#to-friend").val("")
                        $("#email-message").val("")
                        $("#contact-modal").modal("toggle")
                    }
                })
            })
        })

    })