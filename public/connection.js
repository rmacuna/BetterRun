  var finalmap;
  var selectedmaps = [];
  var usernames = [];
  var username;
  var myConection;
  var finalModal;
  var selectedModals = []; //Los tipos seleccionados por todos los usuarios
  let json;
  var inTheGame = false;



  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);

  // Sending data 


  var ocurrencesMap = [];
  var ocurrencesGameMode = [];

  var connectedUsers;
  var UserConectionRef = firebase.database().ref('Conections/');
  var players = firebase.database().ref('Players/');
  var gameinfo = firebase.database().ref('GameInfo/');

// Funcion que escucha cuando cambian datos en los usuarios conectados. 
  UserConectionRef.on('value', data);
  function data(data) {
      connectedUsers = data.val();
      console.log(connectedUsers);
  }

//Funcion que escucha cuando cambian datos en la info del juego
  gameinfo.on('value', function (snapshot) {
      snapshot.forEach(function(childSnapshot){
        var str = JSON.stringify(childSnapshot.val());
        let info = JSON.parse(str);
        var mapname = info["map"];

        var gamemode = info["modal"];
        ocurrencesMap.push(mapname);
        ocurrencesGameMode.push(gamemode);

      });
  });
  // Deteccion de cambios
  // Funcion que se ejecuta cada cierto tiempo.

  // window.setInterval(function() {
  //     try {

  //     } catch (e) {

  //         console.log(e);
  //     }
  // }, 500);

  UserConectionRef.on("value", function(snapshot) {
      if (connectedUsers == 2) {
          firebase.database().ref('Players/').once('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  json = JSON.parse(str);
                  selectedmaps.push(json["map"]);
                  selectedModals.push[json["modal"]];
                  usernames.push(json["username"]);
                  showConection(json["username"], " se ha unido a la partida");

              });
          });
          finalModal = selectedModals[Math.floor(Math.random() * selectedModals.length - 1)];
          console.log(finalmap);
          // pushGameInfo(finalmap, usernames, finalModal);
          initGame();
      } else {
          players.once("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  json = JSON.parse(str);
                  usernames.push(json["username"]);
                  showConection(json["username"], " se ha unido a la partida");
              });
          }, function(errorObject) {
              console.log("Conexion fallida: " + errorObject.code);
          });
      }
  });

  function showConection(user, message) {
      var snackbar = document.getElementById("snackbar");
      snackbar.innerText = user + message;
      snackbar.className = "show";
      setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }

  function showMessage(message) {
      var snackbar = document.getElementById("snackbar");
      snackbar.innerText = message;
      snackbar.className = "show";
      setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 3000);
  }

  // Corregir el unload porque cuando se mete al juego nos saca a todos.

  function pushInformation(modal) {
      if (modal == 'B') {
          username = document.getElementById('username').value;
          if (username.trim().length > 0) {
              inTheGame = true;
              $('#user_input').addClass('disabled');
              $('#btn-play').addClass('disabled');
              $('#btn-blocks').addClass('disabled');
              document.getElementById('btnPrev').disabled = true;
              document.getElementById('btnNext').disabled = true;
              UserConectionRef.on('value', function(snapshot) {
                  myConection = snapshot.val();
              })
              loadInfo(maps[lastMap].name, characterNames[lastChar].name, username, "BombTag");
          } else {
              showMessage("Debe ingresar un nombre de usuario");
          }

      } else if (modal == 'F') {
          username = document.getElementById('username').value;
          if (username.trim().length != 0) {
              inTheGame = true;
              $('#user_input').addClass('disabled');
              $('#btn-play').addClass('disabled');
              $('#btn-blocks').addClass('disabled');
              document.getElementById('btnPrev').disabled = true;
              document.getElementById('btnNext').disabled = true;
              UserConectionRef.on('value', function(snapshot) {
                  myConection = snapshot.val();
              })
              loadInfo(maps[lastMap].name, characterNames[lastChar].name, username, "FallingBlocks");
          } else {
              showMessage("Debe ingresar un nombre de usuario");
          }
      }

  }

  function loadInfo(URL, charName, usname, modality) {
      connectedUsers++;
      firebase.database().ref('Players/' + (connectedUsers)).set({
          map: URL,
          char: charName,
          username: usname,
          modal: modality
      });

      firebase.database().ref('GameInfo/' + (connectedUsers)).set({
        map: URL,
        modal: modality
      });

      UserConectionRef.set(connectedUsers);
  }



  //Ahora detectaremos cuando alguien se salga de la sala de espera.
  window.onbeforeunload = function() {
      if (inTheGame && connectedUsers < 3) {
          players.child(myConection).remove();
          connectedUsers--;
          UserConectionRef.set(connectedUsers);
      }
  };