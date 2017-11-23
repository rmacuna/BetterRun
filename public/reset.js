    
    var clearstate = false;
    
    dbRefClear = firebase.database().ref('clearstate/');
    
    
    dbRefClear.on('value', datavalue);
    
    function datavalue(datavalue){
      clearstate = datavalue.val();
      console.log(clearstate);
      if (clearstate) {
        console.log('Datos eliminados');
        dbRefFinalMap.set("");
        dbRefMapIce.set(0);
        dbRefFallingB.set(0);
        dbRefBombTag.set(0);
        dbRefMapBosque.set(0);
        dbRefMapEspacio.set(0);
        dbRefMapLibertalia.set(0);
        dbRefFinalMode.set("");
        dbRefMapDesert.set(0);
        dbRefMapCementerio.set(0);
        players.remove();
      }
    }
    
    
    
  
    
  
  
