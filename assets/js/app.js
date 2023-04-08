$(document).ready(function() {
    $("#confirmDeleteButton").click(function(event) {
        event.preventDefault();
        window.location.href = $(this).attr("href");
    });
});
