$(document).ready( function(){
  $( ".new-tweet textarea" ).on( "input", function() {

  let currentValue = 140 - $(this).val().length;
  if (currentValue >= 0){
    $(this).closest(".new-tweet").find(".counter").text(currentValue).css('color', 'green')
  }
  else {
    $(this).closest(".new-tweet").find(".counter").text(currentValue).css('color', 'red');
    };
  });
});
