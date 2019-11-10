console.log("profile")
const url = window.location.pathname.split('/')

$(document).ready(() => {
  const id = url[url.length - 1]

  $(".add-item-btn").on("click", () => {
    $("#results-modal").modal("toggle")
  })

  $(function () {
    console.log("CLICKED")
    $("#datepicker").datepicker()
  })


  $("#new-item-submit").on("click", (e) => {
    e.preventDefault()
    let date = $("#datepicker").val().trim()
    let deadline = date.substring(6, 10) + "-" + date.substring(0, 2) + "-" + date.substring(3, 5)

    let newItem = {
      userid: id,
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


  $(".complete").on("click", (e) => {
    let aid = $(e.target).data("id")
    $.put('/api/complete', {
      'userID': id,
      'activityID': aid,

    }, (result) => {
      console.log(result)
      location.reload()
    })
  })

  $.put = function (url, data, callback, type) {

    if ($.isFunction(data)) {
      type = type || callback,
        callback = data,
        data = {}
    }

    return $.ajax({
      url: url,
      type: 'PUT',
      success: callback,
      data: data,
      contentType: type
    });
  }

  $(".add-from-pop").on("click", (e) => {
    let newItem = {
      userid: id,
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
        url: "/api/email/" + toUser,
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
          if (data = "it's okay") {
            $("#interest").val("")
            $("#to-friend").val("")
            $("#email-message").val("")
            $("#contact-modal").modal("toggle")
          }
        })
      })
  })

  $(".find-friend").on("click", (e) => {
    let aid = $(e.target).data("id")
    let activity = $(e.target).data("activity")
    $("#friends").html("")
    console.log("ID: ", id)

    $.ajax({
        url: "/api/nearbyusers/" + id + "/" + aid,
        method: "GET"
      })
      .then((result) => {
        if (result.length == 0) {
          let html = "No friends found!"
          $("#friends").append(html)
        } else {
          for (i = 0; i < result.length; i++) {
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

})