function InvalidMsg(textbox) {
    if(textbox.validity.patternMismatch){
       textbox.setCustomValidity('Field cannot be just empty space.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}


function addSubmit(fields) {
    $.ajax({
        type: "POST",
        url: "add_submit",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(fields),
        success: function(result){
            console.log('success');
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
        $('.custom-form :input').each(function() {
            if ($(this).attr('name')) {
                formData[$(this).attr('name')] = $(this).val();
            }
        });
        console.log(formData);
        $('.custom-form :input').val('');
        addSubmit(formData);
    });

});
