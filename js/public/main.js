window.ondragstart = function() { return false; }

var lastMap = 0;

var maps = ["../assets/images/forest_level_blur.jpg",
        "../assets/images/Desert_level_blur.jpg",
        "../assets/images/Cementery_level_blur.jpg",
        "../assets/images/moonland_level_blur.jpg",
        "../assets/images/ice_level_blur.jpg",
        "../assets/images/libertalia_level-blur.jpg",
        ];


var maps_min = ["../assets/levels/forest_level.png",
        "../assets/levels/Desert_level.png",
        "../assets/levels/Cementery_level.png",
        "../assets/levels/moonland_level.jpg",
        "../assets/levels/ice_level.jpg",
        "../assets/levels/libertalia_level.jpg",
    ];

function play() {
    $('#body-content').load('../public/mapselect.html');  
}
 

function selectMap() {
    $('.ui.modal')
        .modal('show');
}

function next() {
    if (lastMap == 0 || lastMap < maps.length - 1) {
        var url = maps[lastMap + 1];
        var miniatura = maps_min[lastMap + 1];
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
        lastMap++;
    } else if (lastMap == maps.length - 1) {
        lastMap = 0;
        var url = maps[lastMap]
        var miniatura = maps_min[lastMap]
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
    }
}

function prev() {
    if (lastMap == 0) {
        console.log('inicio vamonos a devolvernos al final')
        lastMap = maps.length - 1;
        var url = maps[lastMap];
        var miniatura = maps_min[lastMap];
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
    } else {
        lastMap = lastMap - 1;
        console.log('entre pbto' + lastMap)
        var url = maps[lastMap]
        var miniatura = maps_min[lastMap]
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
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


// Key events
