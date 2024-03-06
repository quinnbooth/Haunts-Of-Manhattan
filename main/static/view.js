let title = $(`<span id="resultTitle">${result['title']}</span><br>`);
let opened = (`<span id="resultOpened"> est. ${result['opened']}</span>`);
let address = $(`<span id="resultAddress">${result['address']}</span><br>`);
let nearby = $(`<div id="resultNearby">Near: </div><br>`);
let description = $(`<span id="resultDescription"><span class="dspan">Description</span><br>${result['description']}</span>`);
let infoCol = $(`<div class="col-8">`);
let imgCol = $(`<div class="col-4 imgCol">`);
let infoRow = $(`<div class="row" id="topRow">`);
let separator = $('<div class="separatorRow">');
let img = $('<img>');

if (result['image'].startsWith("https://") || result['image'].startsWith("http://")){
    img = $(`<img class="resultImg" src='${result['image']}'>`).attr('alt', 'Picture of ' + result['title']);
}

$(document).ready(function() {

    $('#headerRow').append(title).append(address).append(nearby);

    result['nearby'].forEach(function(location) {
        nearby.append(`<a href="/view/${location}" class="nearbyEntry">${location}</a>`);
    });

    if (result['nearby'].length === 0) {
        nearby.append(`<div class="nearbyEntry2">None</div>`);
    }

    title.append(opened);
    infoCol.append(description).append(separator);


    let editLink = $(`<a href="/edit/${result['id']}" class="editLink">Edit Haunt Information</a>`)
    imgCol.append(img).append(editLink);
    infoRow.append(infoCol).append(imgCol);

    $("#container").append(infoRow);
    $(infoCol).append("<div class='row' id='comments'><div class='col-12'>Top Comment</div></div>")

    result['comments'].forEach(function(comment, index) {
        const commentClass = index === 0 ? 'topComment' : 'commentEntry';
        $(infoCol).append(`<div class="row ${commentClass}"><div class="col-12">* ${comment}</div></div>`);
    });

});