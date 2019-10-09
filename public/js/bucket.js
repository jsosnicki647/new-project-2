const moment = require("moment")
    $(document).ready(() => {
        $(".complete").on("click", (e) => {
            let id = $(e.target).data("id")
            $.put('/api/complete', {
                'userID': 2,
                'activityID': id
            }, (result) => {
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
            console.log("CLICK")
            $("#results-modal").modal("toggle")
        })

        $(function(){
            $("#datepicker").datepicker()
        })

        $("#new-item-submit").on("click", (e) => {
            e.preventDefault()
            
            console.log(moment())
            let newItem = {
                userid: 2,
                item: $("#item-input").val().trim(),
                type: $("#category-select").val().trim(),
                deadline: $("#datepicker").val().trim()
            }
            console.log(newItem)
            $.post("/api/newitem", newItem, (data) => console.log(data))
        })

    })
