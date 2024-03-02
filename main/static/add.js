function InvalidMsg(textbox) {
    if(textbox.validity.patternMismatch){
       textbox.setCustomValidity('Field cannot be just empty space.');
    }    
    else {
        textbox.setCustomValidity('');
    }
    return true;
}
