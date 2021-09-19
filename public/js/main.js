

//jquery.validation
$(document).ready(function () {
    jQuery.validator.setDefaults({
        debug: true,
        success: "valid",
    });
});


//
document.addEventListener("DOMContentLoaded", function(event) {


    const cartButtons = document.querySelectorAll('.cart-button');
    
    cartButtons.forEach(button => {
    
    button.addEventListener('click',cartClick);
    
    });
    
    function cartClick(){
    let button =this;
    button.classList.add('clicked');
    }
    
    
    
    });