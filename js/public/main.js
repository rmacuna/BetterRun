function showModal() {
    $('.ui.modal')
        .modal('show');
}

function play() {
    $('#body-content').load('../public/mapselect.html');
}

function playGame() {
    var audio = document.getElementById('audioPlay');
    audio.play();
    var millisecondsToWait = 2000;
    $(document).ready(function() {
        $('body').addClass('vanish')
    });
    setTimeout(function() {
        $("#body-content").load('../public/mainmenu.html');
        $(document).ready(function() {
            $('body').addClass('visiblePage')
            $('body').removeClass('vanish')

            setTimeout(function() {

                $('body').addClass('loaded')
                $('body').removeClass('visiblePage')
            }, 3000);
        });
    }, millisecondsToWait);

}

function selectMap(id) {
    $('.map-shape').mousedown(function(id) {
        $(id).addClass('selectedMap')
        console.log('ds')
    });
}


$(".hoverableSound").mouseenter(function() {
    $("<audio></audio>").attr({
        'src': '../assets/sounds/hoverClick.mp3',
        'volume': 0.4,
        'autoplay': 'autoplay'
    }).appendTo("body");
});