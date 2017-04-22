function validateForm() {
  // var firstName = $("#firstName").val();
  // console.log(firstName);
  // if (firstName == "") {
    
  // }
}

$(document).ready(function() {
  // materialize intializers
  $('.tooltipped').tooltip({delay: 50});
  $('select').material_select();

  // HoneyPot ** Hide 2nd fake email field **
  $('.text-field').hide();

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

  var initialText = "Please specify";
  $('.editOption').val(initialText);

  $('#gender').change(function(){
  var selected = $('option:selected', this).attr('class');
  var optionText = $('.editable').text();

  if(selected == "editable"){
    $('.editOption').show();

    
    $('.editOption').keyup(function(){
        var editText = $('.editOption').val();
        $('.editable').val(editText);
        $('.editable').html(editText);
    });

  }else{
    $('.editOption').hide();
  }
  });


});