  var finalmap;
  var selectedmaps = [];
  var usernames = [];

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

  // }, 2000);
  UserConectionRef.on("value", function(snapshot) {
      if (connectedUsers == 3) {
          var counts = {};
          firebase.database().ref('Players/').once('value', function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  const json = JSON.parse(str);
                  selectedmaps.push(json["map"]);
                  usernames.push(json["username"]);
                  console.log('se conecto ' + json["username"]);
                  console.log(json["map"]); //Tomo los datos corresponidentes trabajandolos como objetos json.
              });
              // // for (var i = 0, i < selectedmaps.length; i++) {
              // //     var map = selectedmaps[i];
              // //     counts[map] = counts[map] ? counts[map] + 1 : 1; //Cuenta las ocurrencias del mapa
              // // }
              // function count(arr) {
              //     return arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})
              // }
              // const maps = count(selectedmaps);
              // console.log(maps.sort(function(a, b){return b-a}));
              // // maps.forEach(function() {

              // // });
          });
          finalmap = selectedmaps[Math.floor(Math.random() * selectedmaps.length-1)]; //Un mapa random entre los elegidos
          console.log('El mapa final escogido fue ' + finalmap);
          console.log('jugadores ' + usernames);
          // initGame();
      } else {
          players.once("value", function(snapshot) {
              snapshot.forEach(function(childSnapshot) {
                  var str = JSON.stringify(childSnapshot.val());
                  const json = JSON.parse(str);
                  usernames.push(json["username"]);
                  console.log('Se conecto ' + json["username"]);
              });
          }, function(errorObject) {
              console.log("Conexion fallida: " + errorObject.code);
          });
      }
  });



  function pushInformation() {
      var username = document.getElementById('username').value;
      $('#user_input').addClass('disabled');
      $('#btn-play').addClass('disabled');
      document.getElementById('btnPrev').disabled = true;
      document.getElementById('btnNext').disabled = true;

      loadInfo(maps[lastMap].image, characterNames[lastChar], username);
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

  // Retrive data from database for