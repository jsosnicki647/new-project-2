$(document).ready(() => {
    $(".complete").on("click", () => {
    console.log("FUCK")

        alert($(this).attr("data-id"))
        $.put('/api/complete', {
            'userID': 2,
            'activityID': 2
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
})