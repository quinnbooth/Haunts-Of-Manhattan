function addSubmit(fields) {
    $.ajax({
        type: "POST",
        url: "add_submit",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(fields),
        success: function(result){
            console.log(result);
            let new_id = result['result']['id'];
            let popup = $(`<div id="newItem"><span class="highlighttext">New item created. View it <a href="/view/${new_id}">here</a>.</span></div><br>`);
            $("#formContainer").prepend(popup);
        },
        error: function(request, status, error){
            console.log("Error");
            console.log(request)
            console.log(status)
            console.log(error)
        }
    });
};

$(document).ready(function() {

    $('#addForm').submit(function(event) {
        event.preventDefault();
        let formData = {};
        let success = true;

        // Read in input values and validate
        $('.custom-form :input').each(function() {
            if ($(this).attr('name')) {

                // Define possible errors
                let error_empty = $(`<div class="formError">ERROR: Field cannot be empty.</div>`);
                let error_year = $(`<div class="formError">ERROR: Field must be an integer between 1000 and 2024.</div>`);
                let error_img = $(`<div class="formError">ERROR: Field start with 'https://' or 'http://'.</div>`);
                let error_nearby = $(`<div class="formError">ERROR: Values must be positive integers (ids of haunts nearby) separated by ', '.</div>`);

                // Get input data and matching label
                let field = $(this).attr('id');
                let input = $(this).val().trim();
                let label = $(this).siblings('label[for="' + field + '"]');

                // Reset errors and log input
                formData[$(this).attr('name')] = input;
                label.find('div').remove();

                // Error check
                if (input.length === 0 && !(field == "nearby_locations" || field == "comment")) {
                    label.append(error_empty);
                    success = false;
                } else if (field == "opened_year") {
                    let intYear = parseInt(input, 10);
                    let fltYear = parseFloat(input);
                    if (isNaN(intYear) || /\D/.test(input) || intYear != fltYear || intYear > 2024 || intYear < 1000) {
                        label.append(error_year);
                        success = false;
                    }
                } else if (field == 'image_link' && !(input.startsWith('https://') || input.startsWith('http://'))) {
                    label.append(error_img);
                    success = false;
                } else if (field == 'nearby_locations' && input.length !== 0) {
                    if (!input.match(/^\d+(?:,\s*\d+)*$/)) {
                        label.append(error_nearby);
                        success = false;
                    }
                }
            }
        });
        
        if (success) {
            $('.custom-form :input').val('');
            addSubmit(formData);
            $('#title').focus();
        }
        
    });

});
