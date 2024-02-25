function selectResult() {
    const id = $(this).data('id');
    window.location.assign(`/view/${id}`);
}

$(document).ready(function() {

    if (results.length === 0) {
        $("#resultsBox").append('<div class="row result"><div class="col-12">No results found.</div></div>');
    } else {
        results.forEach(function(result) {
            let row = $('<div class="row result">');
            row.append('<div class="col-12">' + result[1] + ' ➪ </div>');
            row.data('id', result[0])
            row.click(selectResult);
            $("#resultsBox").append(row);
        });
    }
  
});