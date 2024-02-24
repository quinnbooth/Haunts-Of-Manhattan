$(document).ready(function() {

  $('#searchForm').submit(function(event) {
    event.preventDefault();
    const query = $('#searchBar').val().trim();

    if (query.length === 0) {
      $('#searchBar').val("").focus();
    } else {
      const url = `/search/${encodeURIComponent(query)}`;
      window.location.assign(`/search/${encodeURIComponent(query)}`);
    }

  });

});