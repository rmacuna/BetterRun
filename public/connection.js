  var finalmap;
  var selectedmaps = [];
  var usernames = [];
  var username;
  var myConection;
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

  var connectedUsers;
  var UserConectionRef = firebase.database().ref('Conections/');
  var players = firebase.database().ref('Players/');

  UserConectionRef.on('value', data);
  function data(data) {
      connectedUsers = data.val();
      console.log(connectedUsers)

  }
  // Deteccion de cambios
  // Funcion que se ejecuta cada cierto tiempo.

  // window.setInterval(function() {
  //     try {

  //     } catch (e) {

  //         console.log(e);
  //     }
  // }, 500);

  UserConectionRef.on("value", function(snapshot) {
      if (connectedUsers == 1) {
          firebase.database().ref('Players/').once('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  json = JSON.parse(str);
                  selectedmaps.push(json["map"]);
                  usernames.push(json["username"]);
                  showConection(json["username"], " se ha unido a la partida");
              });
          });
          finalmap = selectedmaps[Math.floor(Math.random() * selectedmaps.length - 1)]; //Un mapa random entre los elegidos
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


  function pushInformation() {
      inTheGame = true;
      username = document.getElementById('username').value;
      $('#user_input').addClass('disabled');
      $('#btn-play').addClass('disabled');
      document.getElementById('btnPrev').disabled = true;
      document.getElementById('btnNext').disabled = true;
      UserConectionRef.on('value', function(snapshot) {
          myConection = snapshot.val();
      })
      loadInfo(maps[lastMap].name, characterNames[lastChar], username);
  }

  function loadInfo(URL, charName, usname) {
      connectedUsers++;
      firebase.database().ref('Players/' + (connectedUsers)).set({
          map: URL,
          char: charName,
          username: usname
      });
      UserConectionRef.set(connectedUsers);
  }
  //Ahora detectaremos cuando alguien se salga de la sala de espera.
  window.onbeforeunload = function() {
      if (inTheGame) {
          players.child(myConection).remove();
          connectedUsers--;
          UserConectionRef.set(connectedUsers);
      }
  };