  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);

  var charname;
  var dbRef = firebase.database().ref('finalmap/');
  var dbRefGMode = firebase.database().ref('finalModal/');
  var dbRefPlayers = firebase.database().ref('Players/');
  const maps = [{
          "name": "Bosque",
          "gravity": "estandar",
          "platformColor": '#388e3c',
          "image": "assets/levels/forest_level.png",
          "music": "assets/music/BetterRun.mp3",
          "blocks": "assets/chars/brick-wall.png"
      },
      {
          "name": "Desierto",
          "gravity": "estandar",
          "platformColor": "#fdd835",
          "music": "assets/music/DesertMap.mp3",
          "image": "assets/levels/Desert_level.png",
          "blocks": "assets/chars/drop.png"
      },
      {
          "name": "Cementerio",
          "gravity": "estandar",
          "platformColor": "#9e9e9e",
          "image": "assets/levels/Cementery_level.png",
          "blocks": "assets/chars/ghost.png",
          "music": "assets/music/HalloweenMap.mp3"
      },
      {
          "name": "Espacio",
          "image": "assets/levels/moonland_level.jpg",
          "gravity": "1.5",
          "Fy": "40",
          "platformColor": "#78909c",
          "music": "assets/music/SpaceMap.mp3",
          "blocks": "assets/chars/moon.png"
      },
      {
          "name": "CuevaHielo",
          "gravity": "estandar",
          "friction": "0.03",
          "platformColor": "#0288d1",
          "image": "assets/levels/ice_level.jpg",
          "music": "assets/music/DesertMap.mp3"
      },
      {
          "name": "Libertalia",
          "gravity": "estandar",
          "platformColor": "#afb42b",
          "image": "assets/levels/libertalia_level.jpg",
          "music": "assets/music/BetterRun.mp3",
          "blocks": "assets/chars/brick-wall.png"
      }
  ];

  function getGameMode() {
      var browserCookies = document.cookie.split(';');
      var mode = browserCookies[1];
      if (mode == "BombTag") {
          return 0;
      } else if (mode == "FallingBlocks") {
          return 1;
      }
  }
  function getFinalMap() {
      var browserCookies = document.cookie.split(';');
      var map = browserCookies[1].split('=')[1];
      for (var k = 0; k < maps.length; k++) {
          if (maps[k].name == map) {
              return maps[k].image;
          }
      }
  }
  function getMaps(){
    return maps;
  }
