  var config = {
      apiKey: "AIzaSyAr7Re6XSMbsoFodWhxo4qkN59ycRlcJx8",
      authDomain: "betterrun-23133.firebaseapp.com",
      databaseURL: "https://betterrun-23133.firebaseio.com",
      projectId: "betterrun-23133",
      storageBucket: "betterrun-23133.appspot.com",
      messagingSenderId: "212662825627"
  };
  firebase.initializeApp(config);


  var dbRef = firebase.database().ref('Conections/');
  var dbRefFinalMap = firebase.database().ref('finalmap/');
  var dbRefFinalMode = firebase.database().ref('finalmode/');
  var dbRefFallingB = firebase.database().ref('FallingBlocks/');
  var dbRefBombTag = firebase.database().ref('BombTag/');



  dbRef.on('value', function(snapshot) {
      connectedUsers = snapshot.val();
  });


  function repush() {
  	console.log('sdasd')
  	initGame();
  }