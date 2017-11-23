window.onload = function() {
  var cookies = document.cookie;
  var splited = cookies.split(";");
  if (splited.length == 5) {
    	splited.splice(0,1);
  }
  if (splited[0] == "BombTag") {
    $('#bt').modal('show');
    setTimeout(function() {
      $('.ui.modal').modal('hide');
    }, 2000);
  }else if (splited[0] == "FallingBlocks"){
    $('#fb').modal('show');
    setTimeout(function() {
      $('.ui.modal').modal('hide');
    }, 2000);
  }
}
