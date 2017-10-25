window.ondragstart = function() { return false; }

var lastMap = 0;

var maps = [
        {
            "name": "El bosque",
            "image": "../assets/levels/forest_level.png",
            "blurImage": "../assets/images/forest_level_blur.jpg",
            "description": "El bosque encantado es una locacion bastante sencilla, no hubo nunca un lugar tan calmado como este"
        },
        {
            "name": "El desierto",
            "image": "../assets/levels/Desert_level.png",
            "blurImage": "../assets/images/Desert_level_blur.jpg",
            "description": "El desierto es aterrador para muchos, pero la verdad es que este parece un oasis tropical. No confíes en el agua que llueve aquí..."
        },
        {
            "name": "Cementerio",
            "image": "../assets/levels/Cementery_level.png",
            "blurImage": "../assets/images/Cementery_level_blur.jpg",
            "description": "El cementerio es un lugar aterrador, quien sabe cuantos fantasmas salen por aquí"
        },
        {
            "name": "Base Militar Luna",
            "image": "../assets/levels/moonland_level.jpg",
            "blurImage": "../assets/images/moonland_level_blur.jpg",
            "description": "En la luna hay que tener mucho cuidado, la gravedad es diferente y ultimamente caen rocas espaciales"
        },
        {
            "name": "Cueva de hielo",
            "image": "../assets/levels/ice_level.jpg",
            "blurImage":  "../assets/images/ice_level_blur.jpg",
            "description": "HACE DEMASIADO FRÍO AQUÍ, sin mencionar que de la cueva caen bloques de hielo mortales"
        },
        {
            "name": "La ciudad perdida",
            "image": "../assets/levels/libertalia_level.jpg",
            "blurImage": "../assets/images/libertalia_level-blur.jpg",
            "description": "La ciudad perdida es un lugar perdido, visitandolo depronto descubras donde esta y te vuelvas famoso"
        }
];

function play() {
    $('#body-content').load('../public/mapselect.html');  
}
 

function selectMap() {
    $('.ui.modal')
        .modal('show');
        
    renderHTML(maps)
}

function renderHTML(data) {
    document.getElementById('mapDescription').innerHTML = "";
    document.getElementById('mapUrl').innerHTML = "";
    document.getElementById('mapName').innerHTML = "";

    var mapDescription = document.getElementById('mapDescription')
    var mapName = document.getElementById('mapName')
    var mapURL = document.getElementById('mapUrl')

    var htmlString = "<p>" + data[lastMap].description + " </p>"
    var html_mapname = "<p>" + data[lastMap].name + " </p>"
    var html_mapURL = "<img src=" + data[lastMap].image + ">" + "</img>"
    mapDescription.insertAdjacentHTML('beforeend', htmlString);
    mapName.insertAdjacentHTML('beforeend', html_mapname);
    mapURL.insertAdjacentHTML('beforeend', html_mapURL);
}


function next() {
    if (lastMap == 0 || lastMap < maps.length - 1) {
        var url = maps[lastMap + 1].blurImage;
        var miniatura = maps[lastMap + 1].image;
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
        lastMap++;
    } else if (lastMap == maps.length - 1) {
        lastMap = 0;
        var url = maps[lastMap].blurImage
        var miniatura = maps[lastMap].image
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
        var url = maps[lastMap].blurImage;
        var miniatura = maps[lastMap].image;
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
    } else {
        lastMap = lastMap - 1;
        var url = maps[lastMap].blurImage
        var miniatura = maps[lastMap].image
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
