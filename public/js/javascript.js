function validateForm() {
  var firstName = $("#firstName").val();
  console.log(firstName);
  alert("connected");
}

$(document).ready(function() {
  var max_fields      = 3; //maximum input boxes allowed
  var wrapper         = $(".hospitalAttendedsPostCodeArea"); //Fields wrapper
  var add_button      = $(".AddHospitalAttended"); //Add button ID
  var x = 1; //initlal text box count

  $(add_button).click(function(e){ //on add input button click
    e.preventDefault();
    if(x < max_fields){ //max input box allowed
      x++; //text box increment
      $(wrapper).append('<div><input type="text" name="hospitalAttendedsPostCode"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
    }
  });
    
  $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
    e.preventDefault(); $(this).parent('div').remove(); x--;
  });

});