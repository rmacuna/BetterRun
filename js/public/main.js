// Remueve la propiedad de que un imagen pueda ser arrastrada de la pantalla
window.ondragstart = function() { return false; }
var lastMap = 0;
var maps = [{
        "name": "El bosque",
        "music": "../assets/music/BetterRun.mp3",
        "soundEffect": "../assets/sounds/forest.mp3",
        "image": "../assets/levels/forest_level.png",
        "blurImage": "../assets/images/forest_level_blur.jpg",
        "description": "El bosque encantado es una locacion bastante sencilla, no hubo nunca un lugar tan calmado como este"
    },
    {
        "name": "El desierto",
        "audio": "../assets/music/DesertMap.mp3",
        "soundEffect": "../assets/sounds/ancient_egyptian.mp3",
        "image": "../assets/levels/Desert_level.png",
        "blurImage": "../assets/images/Desert_level_blur.jpg",
        "description": "El desierto es aterrador para muchos, pero la verdad es que este parece un oasis tropical. No confíes en el agua que llueve aquí..."
    },
    {
        "name": "Cementerio",
        "audio": "../assets/music/HalloweenMap.mp3",
        "soundEffect": "../assets/sounds/horror_amb.mp3",
        "image": "../assets/levels/Cementery_level.png",
        "blurImage": "../assets/images/Cementery_level_blur.jpg",
        "description": "El cementerio es un lugar aterrador, quien sabe cuantos fantasmas salen por aquí"
    },
    {
        "name": "Base Militar Luna",
        "audio": "../assets/music/SpaceMap.mp3",
        "soundEffect": "../assets/sounds/space_amb.mp3",
        "image": "../assets/levels/moonland_level.jpg",
        "blurImage": "../assets/images/moonland_level_blur.jpg",
        "description": "En la luna hay que tener mucho cuidado, la gravedad es diferente y ultimamente caen rocas espaciales"
    },
    {
        "name": "Cueva de hielo",
        "audio": "../assets/music/WinterMap.mp3",
        "soundEffect": "../assets/sounds/wind.mp3",
        "image": "../assets/levels/ice_level.jpg",
        "blurImage": "../assets/images/ice_level_blur.jpg",
        "description": "HACE DEMASIADO FRÍO AQUÍ, sin mencionar que de la cueva caen bloques de hielo mortales"
    },
    {
        "name": "La ciudad perdida",
        "audio": "",
        "soundEffect": "../assets/sounds/jungle.mp3",
        "image": "../assets/levels/libertalia_level.jpg",
        "blurImage": "../assets/images/libertalia_level-blur.jpg",
        "description": "La ciudad perdida es un lugar perdido, visitandolo depronto descubras donde esta y te vuelvas famoso"
    }
];

function play() {
    $('#body-content').load('../public/mapselec.html');
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
function showInstructions() {
    $('#modal-ins')
        .modal('show');
}

function showSettings() {
    $('#modal-sts')
        .modal('show');
}

function about(argument) {
    $('#about')
        .modal('show');
}

function next() {
    var audio = document.getElementById('audioPassLevel');
    document.getElementById('sound').innerHTML = "";
    audio.volume = 0.2;
    audio.load();
    audio.play();
    // Codigo que añade el efecto de nieve en caso tal de que sea el mapa de hielo
    if (lastMap == 3) {
        if (maps[lastMap + 1].name == "Cueva de hielo") {
            document.getElementById('animateScene').innerHTML = "";
            var anim = document.getElementById('animateScene');
            htmlString = "<div id='snow'" + "</div>"
            anim.insertAdjacentHTML('beforeend', htmlString);
        } else if (document.getElementById('snow') != null) {
            document.getElementById('animateScene').innerHTML = "";
        }
    }
    if (lastMap == 0 || lastMap < maps.length - 1) {

        var url = maps[lastMap + 1].blurImage;
        var miniatura = maps[lastMap + 1].image;
        var src = maps[lastMap + 1].soundEffect;

        if (maps[lastMap + 1].name == "Cueva de hielo") {
            document.getElementById('animateScene').innerHTML = "";
            var anim = document.getElementById('animateScene');
            htmlString = "<div id='snow'" + "</div>"
            anim.insertAdjacentHTML('beforeend', htmlString);
        } else if (document.getElementById('snow') != null) {
            document.getElementById('animateScene').innerHTML = "";
        }

        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";
        var sound = document.getElementById('sound');
        htmlString = "<audio " + "id='mapsound' " + "src=" + src + "></audio>";
        sound.insertAdjacentHTML('beforeend', htmlString);
        audio = document.getElementById('mapsound');
        audio.load();
        audio.volume = 0.2;
        audio.play();

        lastMap++;
    } else if (lastMap == maps.length - 1) {
        lastMap = 0;
        var url = maps[lastMap].blurImage
        var miniatura = maps[lastMap].image
        var src = maps[lastMap].soundEffect;
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";

        var sound = document.getElementById('sound');
        htmlString = "<audio " + "id='mapsound' " + "src=" + src + "></audio>";
        sound.insertAdjacentHTML('beforeend', htmlString);
        audio = document.getElementById('mapsound');
        audio.load();
        audio.volume = 0.2;
        audio.play();
    }
}

function loadLobby () {
    var millisecondsToWait = 2000;
    $(document).ready(function() {
        $('body').removeClass('loaded')
        $('body').addClass('vanish')
    });
    setTimeout(function() {
        $("#body-content").load('../public/lobby.html');
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


function prev() {
    var audio = document.getElementById('audioPassLevel');
    document.getElementById('sound').innerHTML = "";
    audio.volume = 0.2;
    audio.load();
    audio.play();

    if (lastMap == 0) {

        lastMap = maps.length - 1;
        var url = maps[lastMap].blurImage;
        var miniatura = maps[lastMap].image;
        var src = maps[lastMap].soundEffect;
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";


        var sound = document.getElementById('sound');
        htmlString = "<audio " + "id='mapsound' " + "src=" + src + "></audio>";
        sound.insertAdjacentHTML('beforeend', htmlString);
        audio = document.getElementById('mapsound');
        audio.load();
        audio.volume = 0.2;
        audio.play();

    } else {
        lastMap--;
        var url = maps[lastMap].blurImage
        var miniatura = maps[lastMap].image
        var src = maps[lastMap].soundEffect;
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";

        if (maps[lastMap].name == "Cueva de hielo") {
            document.getElementById('animateScene').innerHTML = "";
            var anim = document.getElementById('animateScene');
            htmlString = "<div id='snow'" + "</div>"
            anim.insertAdjacentHTML('beforeend', htmlString);
        } else if (document.getElementById('snow') != null) {
            document.getElementById('animateScene').innerHTML = "";
        }

        var sound = document.getElementById('sound');
        htmlString = "<audio " + "id='mapsound' " + "src=" + src + "></audio>";
        sound.insertAdjacentHTML('beforeend', htmlString);
        audio = document.getElementById('mapsound');
        audio.load();
        audio.volume = 0.2;
        audio.play();
    }
}

function playGame() {
    var backgroundAudio = document.getElementById('BetterRun');
    var audio = document.getElementById('audioPlay');
    audio.play();
    var millisecondsToWait = 2000;
    $(document).ready(function() {
        $('body').addClass('vanish')

    });
    setTimeout(function() {
        $("#body-content").load('../public/mapselect.html');
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
        'volume': 0.2,
        'autoplay': 'autoplay'
    }).appendTo("body");
});