  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);


  var dbRef = firebase.database().ref('winner/');
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

  dbRef.on('value', function(snapshot) {
      winner = snapshot.val();
      document.getElementById('win').innerText = "El ganador es " + winner;
  });
  function reset() {
      dbRefFinalMap.set("");
      dbRefMapIce.set(0);
      dbRefFallingB.set(0);
      dbRefBombTag.set(0);
      dbRefMapBosque.set(0);
      dbRefMapEspacio.set(0);
      dbRefMapLibertalia.set(0);
      dbRef.set("");
      dbRefFinalMode.set("");
      dbRefMapDesert.set(0);
      UserConectionRef.set(0);
      dbRefMapCementerio.set(0);
      players.remove();
      window.location.href = "index.html";
  }