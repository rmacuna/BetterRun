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
  var winner;

  dbRef.on('value', function (snapshot) {
    winner = snapshot.val();
    document.getElementById('win').innerText = "El ganador es " + winner;
  });






  

