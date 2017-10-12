


var lastMap = 1;

var maps = ["../assets/images/forest_level_blur.jpg",
            "../assets/images/Desert_level_blur.jpg",
            "../assets/images/Cementery_level2_blur.jpg",
            "../assets/images/hounted_level_blur.jpg",
            "../assets/images/ice_level_blur.jpg",
            "../assets/images/libertalia_level-blur.jpg",
            "../assets/images/space_level_blur.jpg"];

var maps_min = ["../assets/levels/forest_level.png", 
                "../assets/levels/Desert_level.png", 
                "../assets/levels/Cementery_level2.jpg",
                "../assets/levels/hounted_level.png",
                "../assets/levels/ice_level.jpg",
                "../assets/levels/libertalia_level.jpg",
                "../assets/levels/space_level.jpg"];


function play() {
    $('#body-content').load('../public/mapselect.html');
}

function next(){
    console.log(lastMap)
    var url = maps[lastMap]
    var miniatura = maps_min[lastMap]
    document.body.style.width = "100%";
    document.body.style.background = "url( " + url + ") no-repeat center center fixed";
    document.getElementById("mapimg").src = miniatura;
    document.body.style.backgroundSize = "cover";
    nextMap(lastMap);
    lastMap = lastMap + 1;
    if (lastMap == maps.length) {
        lastMap = 0;
    }
}

function nextMap(lastMap){
    for (var i = lastMap; i <= maps.length-1; i++) {
        console.log(maps[i]);
    }
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

function showModal() {
    $('.ui.modal')
        .modal('show');
}

$(".hoverableSound").mouseenter(function() {
    $("<audio></audio>").attr({
        'src': '../assets/sounds/hoverClick.mp3',
        'volume': 0.4,
        'autoplay': 'autoplay'
    }).appendTo("body");
});