

//load your JSON (you could jQuery if you prefer)
function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', './wheel_data.php?lang='+urlParamLang+ '&r=_'+ new Date().getTime() + '&uuid=' + urlParamUUID, true); 
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      //Call the anonymous function (callback) passing in the response
      // console.log(xobj.responseText)
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}


//your own function to capture the spin results
function myResult(e) {
  //e is the result object
    
    // added chrisab - 3-12-2021
    // SaveSpinResult(e.spinCount,e.msg);    
    // if (e.spinCount == 0)
    //     localStorage.setItem("resultCode", e.userData.resultCode);

    // // if you have defined a userData object...
    // if(e.userData){
      
    //   console.log('User defined score: ' + e.userData.score)

    // }

/*  if(e.spinCount == 3){
    show the game progress when the spinCount is 3
    console.log(e.target.getGameProgress());
    restart it if you like
    e.target.restart();
  }*/  

}

//your own function to capture any errors
function myError(e) {
  //e is error object
  console.log('Spin Count: ' + e.spinCount + ' - ' + 'Message: ' +  e.msg);

}

function myGameEnd(e) {
    //e is gameResultsArray
    let prizeWon, prizeTier;

    // added chrisab - 3-15-2021
    $.each(e.results, function (key, value) {
        var message = $(value.msg).text().replace('YOU WON', '').toUpperCase();
        switch (message) {
            case "TRY AGAIN":
                break;
            case "COBA LAGI":
                break;
            case "THỬ LẠI":
                break;
            case "ลองอีกครั้ง":
                break;
            case "再试一次":
                break;
            default:
                $('#divDynamicResult').append(message);
        }
        if (value.win === true) {
          prizeWon = value.userData.prize_name;
          prizeTier = value.userData.prize_tier;
          $('.congrats-header').attr('src', 'img/' + value.userData.prize_tier + '.webp');
        }
    });

    bonusValue = prizeTier;
}


function init() {

  loadJSON(function(response) {
    // Parse JSON string to an object
    var jsonData = JSON.parse(response);
    //if you want to spin it using your own button, then create a reference and pass it in as spinTrigger
    var mySpinBtn = document.querySelector('.spinBtn');
    //create a new instance of Spin2Win Wheel and pass in the vars object
    var myWheel = new Spin2WinWheel();
    
    //WITH your own button
    myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError, spinTrigger: mySpinBtn});
    
    //WITHOUT your own button
    //myWheel.init({data:jsonData, onResult:myResult, onGameEnd:myGameEnd, onError:myError});
  });
}




//And finally call it
init();
