let suggested = []

function getSuggestions(suggestions) {
    $.ajax({
        type: "POST",
        url: "get_suggestions",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(suggestions),
        success: function(result){
            suggested = result["result"];
            displaySuggestions();
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
};

function displaySuggestions() {
    let imgRow = $('<div class="row result">');
    let txtRow = $('<div class="row result">');
    suggested.forEach(function(suggestion) {
        const suggestionImg = $('<img class="suggestionImg">').attr('src', suggestion['image']);
        const suggestionTxt = $('<div>' + suggestion['title'] + '</div>');
        imgRow.append($('<div class="col-4 suggested"></div>').append(suggestionImg));  
        txtRow.append($('<div class="col-4 suggested"></div>').append(suggestionTxt));
    });
    $("#suggestions").append(imgRow).append(txtRow);


}


$(document).ready(function() {

    // Replace these with which entry id's you want suggested.
    getSuggestions([4, 7, 10]);
  
});
