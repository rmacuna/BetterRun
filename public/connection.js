  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);

  // Variables locales de apoyo
  var username;
  var myConection;
  let json;
  var inTheGame = false;
  var connectedUsers;
  var countMapDesert;
  var countMapBosque;
  var countMapEspacio;
  var countMapLibertalia;
  var countMapIce;
  var countMapCementerio;
  var countFB;
  var countBT;
  // Referencias a la base de datos.
  var UserConectionRef = firebase.database().ref('Conections/');
  var players = firebase.database().ref('Players/');
  var dbRefMapDesert = firebase.database().ref('selectedMaps/Desierto/');
  var dbRefMapBosque = firebase.database().ref('selectedMaps/Bosque/');
  var dbRefMapIce = firebase.database().ref('selectedMaps/CuevaHielo/');
  var dbRefMapEspacio = firebase.database().ref('selectedMaps/Espacio/');
  var dbRefMapLibertalia = firebase.database().ref('selectedMaps/Libertalia/');
  var dbRefMapCementerio = firebase.database().ref('selectedMaps/Cementerio/');
  var dbRefFallingB = firebase.database().ref('FallingBlocks/');
  var dbRefBombTag = firebase.database().ref('BombTag/');
  var dbRefFinalMap = firebase.database().ref('finalmap/');
  var dbRefFinalMode = firebase.database().ref('finalmodal/');

  // Funcion que escucha cuando cambian datos en los usuarios conectados. 
  UserConectionRef.on('value', data);

  function data(data) {
      connectedUsers = data.val();
      console.log(connectedUsers);
  }
  // Escucho cuando alguien selecciona FallingBlocks o BombTag
  dbRefBombTag.on('value', dataMode);

  function dataMode(dataMode) {
      countBT = dataMode.val();
      if (connectedUsers == 3) {
        if (countBT > countFB) {
          dbRefFinalMode.set('BombTag');
        }else if (countBT == countFB){
          dbRefFinalMode.set('FallingBlocks');
        }else if(countBT < countFB){
          dbRefFinalMode.set('FallingBlocks');
        }
      }
  }
  dbRefFallingB.on('value', dataMode2);

  function dataMode2(dataMode2) {
      countFB = dataMode2.val();
      if (connectedUsers == 3) {
        if (countFB > countBT) {
          dbRefFinalMode.set('FallingBlocks');
        }else if (countBT == countFB){
          dbRefFinalMode.set('FallingBlocks');
        }else if (countFB < countBT){
          dbRefFinalMode.set('BombTag');
        }
      }
  }
  // Este pedazo del codigo escucha cuando hay cambios en los contadores en firebase de quienes han seleccionado
  // Estos mapas. 
  dbRefMapDesert.on('value', dataMapDesert);

  function dataMapDesert(dataMapDesert) {
      countMapDesert = dataMapDesert.val();
  }

  dbRefMapIce.on('value', dataMapIce);

  function dataMapIce(dataMapIce) {
      countMapIce = dataMapIce.val();
  }

  dbRefMapBosque.on('value', dataMapBosque);

  function dataMapBosque(dataMapBosque) {
      countMapBosque = dataMapBosque.val();
  }

  dbRefMapEspacio.on('value', dataMapEspacio);

  function dataMapEspacio(dataMapEspacio) {
      countMapEspacio = dataMapEspacio.val();
  }

  dbRefMapCementerio.on('value', dataMapCementerio);

  function dataMapCementerio(dataMapCementerio) {
      countMapCementerio = dataMapCementerio.val();
  }

  dbRefMapLibertalia.on('value', dataMapLibertalia);

  function dataMapLibertalia(dataMapLibertalia) {
      countMapLibertalia = dataMapLibertalia.val();
  }


  UserConectionRef.on("value", function(snapshot) {
      if (connectedUsers == 3) {
          firebase.database().ref('Players/').once('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  json = JSON.parse(str);
                  showConection(json["username"], " se ha unido a la partida");
              });
          });

          firebase.database().ref('selectedMaps').once('value', function(snapshot) {
              var may = 0;
              var pos = 0;
              var i = 0;
              snapshot.forEach(function(childSnapshot) {
                  var value = childSnapshot.val();
                  if (value > may) { 
                    may = value; 
                    pos = i;
                  }
                  i++;
              });
              switch (pos) {
                  case 0:
                      firebase.database().ref('finalmap').set("Bosque");
                      break;
                  case 1:
                      firebase.database().ref('finalmap').set("Desierto");
                      break;
                  case 2:
                      firebase.database().ref('finalmap').set("CuevaHielo");
                      break;
                  case 3:
                      firebase.database().ref('finalmap').set("Libertalia");
                      break;
                  case 5:
                       firebase.database().ref('finalmap').set("Luna");
                  case 6:
                      firebase.database().ref('finalmap').set("Cementerio");
              }
          });


          // pushGameInfo(finalmap, usernames, finalModal);
          initGame();
      } else {
          players.once("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  json = JSON.parse(str);
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

      if (URL == "El bosque") {
          countMapBosque++;
          dbRefMapBosque.set(countMapBosque);
      } else if (URL == "El desierto") {
          countMapDesert++;
          dbRefMapDesert.set(countMapDesert);
      } else if (URL == "Cementerio") {
          countMapCementerio++;
          dbRefMapCementerio.set(countMapDesert);
      } else if (URL == "Base Militar Luna") {
          countMapEspacio++;
          dbRefMapEspacio.set(countMapEspacio);
      } else if (URl == "Cueva de hielo") {
          countMapIce++;
          dbRefMapIce.set(countMapEspacio);
      } else if (URL == "Libertalia") {
          countMapLibertalia++;
          dbRefMapLibertalia.set(countMapLibertalia);
      }
      if (modality == 'BombTag') {
          countBT++;
          dbRefBombTag.set(countBT);
      } else {
          countFB++;
          dbRefFallingB.set(countFB);
      }
      UserConectionRef.set(connectedUsers);
  }

  function getUsName () {
    return username;
  }
  //Ahora detectaremos cuando alguien se salga de la sala de espera.
  window.onbeforeunload = function() {
      if (inTheGame && connectedUsers < 2) {
          players.child(myConection).remove();
          connectedUsers--;
          UserConectionRef.set(connectedUsers);
      }
  };