// Remueve la propiedad de que un imagen pueda ser arrastrada de la pantalla
window.ondragstart = function() { return false; }
var lastMap = 0;

// Creo el formato JSON con la información de cada mapa.
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


var characterNames = [{
        "name": "Cid",
        "img": ""
    },
    {
        "name": "Gladiador",
        "img": ""
    },
    {
        "name": "Nemesis",
        "img": ""
    },
    {
        "name": "Brujo",
        "img": ""
    },
];

// Carga por medio de Ajax la pagina mapselec
function play() {
    $('#body-content').load('../public/mapselec.html');
}



function logUserToLobbby() {
    // Tomo el contenido HTML que hay en los tags P con id username1,username2,username3,username4
    var text_user1 = document.getElementById('username1');
    var content_user1 = document.getElementById('avatar_img_1');

    var text_user2 = document.getElementById('username2');
    var content_user2 = document.getElementById('avatar_img_2');

    var text_user3 = document.getElementById('username3');
    var content_user3 = document.getElementById('avatar_img_3');

    var text_user4 = document.getElementById('username4');
    var content_user4 = document.getElementById('avatar_img_4');

    // Tomo la lista de usuarios conectados y los guardo en la variable
    var ids;

    ids.forEach(function(element, index) {
        avatar_name = characterNames[index].name;
        route = "<img src=" + characterNames[index].img + ">" + "</img>";

        if (index == 0) {
            text_user1.insertAdjacentHTML('beforeend', avatar_name);
            content_user1.insertAdjacentHTML('beforeend', route);
        } else if (index == 1) {
            text_user2.insertAdjacentHTML('beforeend', avatar_name);
            content_user2.insertAdjacentHTML('beforeend', route);
        } else if (index == 2) {
            text_user3.insertAdjacentHTML('beforeend', avatar_name);
            content_user3.insertAdjacentHTML('beforeend', route);
        } else if (index == 3) {
            text_user4.insertAdjacentHTML('beforeend', avatar_name);
            content_user4.insertAdjacentHTML('beforeend', route);
        }
    });
}


function initGame() {
    var millisecondsToWait = 2000;
    $(document).ready(function() {
        $('body').addClass('vanish')
    });
    setTimeout(function() {

        $(document).ready(function() {
            setTimeout(function() {
                $('body').addClass('visiblePage')
                $('body').removeClass('vanish')
                window.location.href = "../js/public/index.html";
                $('body').addClass('loaded')
                $('body').removeClass('visiblePage')

            }, 3000);

        });
    }, millisecondsToWait);
}

// Abre el modal y ejecuta la funcion renderHTML que toma el array de mapas y lo escribe en HTML
function selectMap() {
    $('.ui.modal')
        .modal('show');

    renderHTML(maps)
}


// Toma informacion que hay en los div mapDescription, Map Url y MapName
// Luego borra el contenido que tenga dentro para setearlo de acuerdo a la informacion del mapa seleccionado
// La informacion esta contenida en un array con formato JSON.

function renderHTML(data) {

    // Esto lo hago con el proposito de que cuando se cambie de mapa se borre el contenido 
    // HTML insertado del mapa anterior.
    document.getElementById('mapDescription').innerHTML = "";
    document.getElementById('mapUrl').innerHTML = "";
    document.getElementById('mapName').innerHTML = "";

    // Guardo los elementos en una variable
    var mapDescription = document.getElementById('mapDescription')
    var mapName = document.getElementById('mapName')
    var mapURL = document.getElementById('mapUrl')

    // Genero mi string html para insertar con la información que necesito para el caso
    var htmlString = "<p>" + data[lastMap].description + " </p>"
    var html_mapname = "<p>" + data[lastMap].name + " </p>"
    var html_mapURL = "<img src=" + data[lastMap].image + ">" + "</img>"

    // Inserto el codigo HTML que escribí.
    mapDescription.insertAdjacentHTML('beforeend', htmlString);
    mapName.insertAdjacentHTML('beforeend', html_mapname);
    mapURL.insertAdjacentHTML('beforeend', html_mapURL);
}


// Muestra el modal de instrucciones del juego
function showInstructions() {
    $('#modal-ins')
        .modal('show');
}
// Para mostrar el modal de quienes hicieron el juego
function about(argument) {
    $('#about')
        .modal('show');
}

// Se ejecuta para pasar al siguiente mapa recorriendo el array en formato JSON respectivo.
// Asi mismo ejecuta un sonido de cambio de mapa.
function next() {
    // Tomo el elemento de audio y le vacio el contenido html dentro de el para remover
    // el audio del mapa anterior.
    var audio = document.getElementById('audioPassLevel');
    document.getElementById('sound').innerHTML = "";
    audio.volume = 0.2;
    audio.load(); // Load lo coloco para que se reprodusca denuevo sin necesidad de haber terminado el audio.
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
    // Verifico que el mapa actual donde me encuentro ubicado no sea el ultimo.
    if (lastMap == 0 || lastMap < maps.length - 1) {

        // Tomo lo que hay en el array de mapas en la posicion respectiva y luego
        // tomo la propiedad de blurImage para colorcar el respectivo fondo difuminado.
        var url = maps[lastMap + 1].blurImage;
        var miniatura = maps[lastMap + 1].image;
        var src = maps[lastMap + 1].soundEffect;

        // Codigo que añade el efecto de nieve en caso tal de que sea el mapa de hielo
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

    } else if (lastMap == maps.length - 1) { // Verifico si es el ultio mapa
        // Me devuevo al primer mapa si es cierto y coloco la imagen respectiva
        lastMap = 0;
        var url = maps[lastMap].blurImage
        var miniatura = maps[lastMap].image
        var src = maps[lastMap].soundEffect;
        // Le añado propiedades y estilos css
        document.body.style.width = "100%";
        document.body.style.background = "url( " + url + ") no-repeat center center fixed";
        document.getElementById("mapimg").src = miniatura;
        document.body.style.backgroundSize = "cover";

        // Le inserto la respectiva pista de audio para el mapa correspondiente.
        var sound = document.getElementById('sound');
        htmlString = "<audio " + "id='mapsound' " + "src=" + src + "></audio>";
        sound.insertAdjacentHTML('beforeend', htmlString);
        audio = document.getElementById('mapsound');
        audio.load();
        audio.volume = 0.2;
        audio.play();
    }
}

// Carga el lobby de espera antes de jugar.
function loadLobby() {
    var millisecondsToWait = 2000;
    // Tomo el style del body y lo pongo en nada, ya que anteriormente esta tenia un fondo de pantalla que no
    // va en el archivo html que será cargado con ajax.
    document.getElementsByTagName('body')[0].style = "";
    $(document).ready(function() {
        $('body').removeClass('loaded')
        $('body').addClass('vanish')
    });
    setTimeout(function() {
        $("#body-content").load('../public/lobby.html');

        $(document).ready(function() {
            $('body').removeClass('dimmable loaded')
            $('body').addClass('visiblePage')
            $('body').removeClass('vanish')
            setTimeout(function() {
                $('body').addClass('loaded')
                $('body').removeClass('visiblePage')
            }, 3000);
        });
    }, millisecondsToWait);
}


// Se ejecuta para pasar al siguiente mapa recorriendo el array en formato JSON respectivo.
// Asi mismo ejecuta un sonido de cambio de mapa.
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

// Función que te lleva al menu  de seleccion de mapas
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

// Funcion generica para mostrar un modal
function showModal() {
    $('.ui.modal')
        .modal('show');
}

// Toma los elementos con clase hoverableSound y reproduce el respectivo sonido.
$(".hoverableSound").mouseenter(function() {
    $("<audio></audio>").attr({
        'src': '../assets/sounds/hoverClick.mp3',
        'volume': 0.2,
        'autoplay': 'autoplay'
    }).appendTo("body");
});