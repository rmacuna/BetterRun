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

  function finalmap() {
      dbRef.on('value', function(snapshot) {
          return snapshot.val();
      });
  }

  function gameMode() {
      dbRefGmode.on('value', function(snapshot) {
          return snapshot.val();
      });
  }

  function getChar(username) {
      dbRefPlayers.once('value', data);
  }

