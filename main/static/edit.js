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
        url: "edit_submit",                
        dataType : "json",
        contentType: "application/json; charset=utf-8",
        data : JSON.stringify(fields),
        success: function(result){
            console.log(result);
            let old_id = result['result']['id'];
            window.location.assign(`/view/${old_id}`);
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

    console.log(results);

    $("#title").val(results['title']);
    $("#address").val(results['address']);
    $("#image_link").val(results['image']);
    $("#nearby_locations").val(results['nearby'].join(', '));
    $("#opened_year").val(parseInt(results['opened']));
    $("#description").val(results['description']);
    $("#comment").val(results['comments'].map(comment => comment.replace(/,/g, '')).join(', '));

    $('#addForm').submit(function(event) {
        event.preventDefault();
        let formData = {};
        $('.custom-form :input').each(function() {
            if ($(this).attr('name')) {
                formData[$(this).attr('name')] = $(this).val();
            }
        });
        formData['id'] = results['id'];
        $('.custom-form :input').val('');
        addSubmit(formData);
        $('#title').focus();
    });

    $("#discardBtn").click(function(event) {
        event.preventDefault();

        var isSure = confirm("Are you sure you want to discard changes?");

        if (isSure) {
            window.location.href = `/view/${results['id']}`;
        }

    });

});
