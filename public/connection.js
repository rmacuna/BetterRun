  var finalmap;

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
      if (connectedUsers == 2) {
          firebase.database().ref('Players/').once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var str = JSON.stringify(childSnapshot.val());
                const json = JSON.parse(str);
                console.log(json["map"]); //Tomo los datos corresponidentes trabajandolos como objetos json.
            });
          });
          // var users = snapshot.val();
          // initGame();
      }
  });

  players.on("value", function(snapshot) {

  }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
  });

  function pushInformation() {
      var username = document.getElementById('username').value;
      $('#user_input').addClass('disabled')
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