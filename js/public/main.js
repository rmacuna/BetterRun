
function showModal() {
    $('.ui.modal')
        .modal('show');}

function playClickSound(){
	var audio = document.getElementById('audioPlay');
	audio.play();}

$(".hoverableSound").mouseenter(function(){
  	$("<audio></audio>").attr({
  		'src':'../assets/sounds/hoverClick.mp3',
  		'volume':0.4,
  		'autoplay':'autoplay'
  	}).appendTo("body");
});
