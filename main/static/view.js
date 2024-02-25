let img = $('<img class="resultImg">').attr('src', result['image']);
let title = $(`<span id="resultTitle">${result['title']}</span><br>`);
let opened = (`<span id="resultOpened"> est. ${result['opened']}</span>`);
let address = $(`<span id="resultAddress">${result['address']}</span><br>`);
let nearby = $(`<div id="resultNearby">Near: </div><br>`);
let description = $(`<span id="resultDescription">${result['description']}</span>`);
let infoCol = $(`<div class="col-6">`);
let imgCol = $(`<div class="col-6 imgCol">`);
let infoRow = $(`<div class="row" id="topRow">`);

$(document).ready(function() {

    result['nearby'].forEach(function(location) {
        nearby.append(`<div class="nearbyEntry">${location}`);
    });

    title.append(opened);
    infoCol.append(title).append(address).append(nearby).append(description);
    imgCol.append(img);
    infoRow.append(infoCol).append(imgCol);

    $("#container").append(infoRow);
    $("#container").append("<div class='row' id='comments'><div class='col-12'>Comments:</div></div>")

    result['comments'].forEach(function(comment) {
        $("#container").append(`<div class="row commentEntry"><div class="col-12">${comment}</div></div>`);
    });

});