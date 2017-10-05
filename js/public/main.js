function showModal() {
    $('.ui.modal')
        .modal('show');
}

function playGame() {
    var audio = document.getElementById('audioPlay');
    audio.play();
    var millisecondsToWait = 800;  
      
    setTimeout(function() {
       $("#body-content").load('../public/mainmenu.html');
       $(document).ready(function() {
   			 setTimeout(function(){
   				 $('body').addClass('loaded')
   			 },3000);
   		});
    }, millisecondsToWait);
      
}

$(".hoverableSound").mouseenter(function() {
    $("<audio></audio>").attr({
        'src': '../assets/sounds/hoverClick.mp3',
        'volume': 0.4,
        'autoplay': 'autoplay'
    }).appendTo("body");
});

