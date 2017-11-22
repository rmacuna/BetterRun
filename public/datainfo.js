  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);


  var dbRef = firebase.database().ref('finalmap/');
  var dbRefGMode = firebase.data().ref('finalModal/');
  var dbRefPlayers = firebase.data().ref('Players/');

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
      dbRefPlayers.on('value', function(snapshot) {
          snapshot.forEach(function(childSnapshot) {
              let json = childSnapshot.val();
              if (json["username"] == username) {
                  return json["username"];
              }
          });
      });
  }