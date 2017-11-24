var cookies = document.cookie;
var splited = cookies.split(";");
if (splited.length == 5) {
  splited.splice(0,1);
}
let aux = [];
 for (var i = 0; i < splited.length; i++) {
  let aux = splited[i].split("=");
  if (aux[0].trim() == "finalmode") {
    let mode = aux[1];
    switch (mode){
      case "BombTag":
      gamemode = 0;
      break;
      case "FallingBlocks":
      gamemode = 1;
      break;
    }
  }
}

if (gamemode == 0) {
    $('#bt').modal('show');
    setTimeout(function() {
        $('.ui.modal').modal('hide');
    }, 2000);
} else if (gamemode == 1) {
    $('#fb').modal('show');
    setTimeout(function() {
        $('.ui.modal').modal('hide');
    }, 2000);
}



function showWinner (argument) {
  
}

