


function loop(){
	$('.animOb').removeAttr('style') //reset the initial position
    $('.animOb').delay(3600).animate({'left': '1800px'}, 5000);
    $('.animOb').delay(12600).animate({'right': '1800px'}, 5000, loop); //Add the loop function in callback
}

window.onload = function() {
  loop()
};