
  var round = 3;
  var computerScore = 0;
  var playerScore = 0;
  var gameMode = 0;
  var seq = [];
  var counter = 0;
  var nIntervId;
  var nIntervId2;
  var option1HighScore =0;
  var option2HighScore =0;
  var bestTime = 999999;
  var timer=0;
  var winCondition = '';


$( function() {

    $( "button" ).button();

    $("#normal").click(normalGame);
    $("#option2").click(option2);
    $("#option1").click(option1);

//make pictures hidden
    $('.playerPitcures').each(function(i, obj){
      $(this).css('visibility','hidden');
      //add an onclick for the pictures
      //$(this).click(choiceMade);
    });

    $('.computerPitcures').each(function(i, obj){
      $(this).css('visibility','hidden');
    });


  } );

//normal is clicked====================================
//also try again button
function normalGame() {

  $('.best').text('');
  $('.roundSpan').text('');
  $('.scoreSpan').text('');
//show round number
$('.roundSpan').text('Round: '+round);

//player score
$('.scoreSpan').text('Player Score: '+playerScore);

//clear borders
  $('.playerPitcures').each(function(i, obj){
    $(this).css('border','');
    //add an onclick for the pictures
    $(this).click(choiceMade);
  });
//hide computer pictures
  $('.computerPitcures').each(function(i, obj){
    $(this).css('visibility','hidden');
    //add an onclick for the pictures
    //$(this).click(choiceMade);
  });

  $( "button" ).css('visibility', 'hidden');
//make pictures visible
$('.playerPitcures').each(function(i, obj){
  $(this).css('visibility','visible');
});

$(".playerMessage").text('Chose your weapon!');
$(".computerMessage").text('');
$(".playerMessage").css('color','');

}

//option 2 is clicked=========================================
// copy the selection of computer choices

function option2() {
if (bestTime > 2000){
  $('.best').text('Best Time:0 Best Score:'+option2HighScore);
} else {
  $('.best').text('Best Time:'+bestTime+' Best Score:'+option2HighScore);
}



  playerScore=0;
//start the game, remove the buttons
nIntervId2 = setInterval(function(){timer++;
  //show instructions in player message
  $('.playerMessage').text(timer+" Beat the Computer's sequence");
}, 1000);
round = 0;
seq = [];
counter = 0;


$('.playerScore').text('');
$('.playerMessage').css('color','black');
$('.computerMessage').text('');
$('button').each(function(i, obj){
  $('.scoreSpan').text("Score:"+playerScore);
  $(this).css('visibility','hidden');
});

//set the click events for the computerPitcures
$('.playerPitcures').each(function(i, obj){
  $(this).css('border','');
  //add an onclick for the pictures
  $(this).click(option2Choice);
});

gameMode = 1;
//hide player pictures
$('.playerPitcures').each(function(i, obj){
  $(this).css('visibility','hidden');
});
//hide the computer pictures
$('.computerPitcures').each(function(i, obj){
  $(this).css('visibility','hidden');
});



//set the round number
round = 1;
$('.roundSpan').text('Round '+ round);
option2Start();
} //option2 function

function option2Start(){
  //show round counter
$('.roundSpan').text('Round: '+round);
//clear borders
  $('.playerPitcures').each(function(i, obj){
    $(this).css('border','');
  });

//show the sequence
playBackSeq();

} //end of option2start

//playback the sequence
function playBackSeq(){

  $('.computerPitcures').each(function(i, obj){
    $(this).css('visibility','hidden');
  });
  $('.playerPitcures').each(function(i, obj){
    $(this).css('visibility','hidden');
  });
counter = 0;
nIntervId = setInterval(function(){playBackSeqHelper();}, 2000);

} //end of playBackSeq

function playBackSeqHelper()
{
  if (counter == seq.length){
    clearInterval(nIntervId);
    ////console.log("made it");
    afterSequence();
    return;
  }
  //hide computer pictures

  $('.computerPitcures').each(function(i, obj){
    $(this).css('visibility','hidden');
  });

  ////console.log(counter);
  ////console.log(seq.length);
  ////console.log(seq[counter]);

  setTimeout(function(){

    $('.computerPitcures').each(function(i, obj){
      $(this).css('visibility','hidden');
    });

  }, 1000);

  $(".computerPitcures[alt='"+seq[counter]+"']").css('visibility','visible');

  counter++;
}

function afterSequence() {

  if (counter == seq.length) {
    //generate new ones
      var randomNumber = Math.floor(Math.random() * 8);
      if (randomNumber <= 2) {
        //rock
          $(".computerPitcures[alt='rock']").css("visibility",'visible');
    //add rock to the sequence
    seq.push('rock');

      } else if ((randomNumber > 2) && (randomNumber <=5)) {
        //paper
        $(".computerPitcures[alt='paper']").css("visibility",'visible');
    //add paper to seq
        seq.push('paper');
      } else if (randomNumber > 5) {
        //scissors
        $(".computerPitcures[alt='scissors']").css("visibility",'visible');
    //add scissors to seq
        seq.push('scissors');
      }

  }

  //call playersTurn

  setTimeout(function(){
      playersTurnOption1();
  }, 1000);

  counter = 0;

}



//what happens when you click on the pictures playing option2
function option2Choice() {
//highlight the picture
  $(this).css({"border-color": "black",
             "border-width":"3px",
             "border-style":"solid"});

//check if its the right one

if (seq[counter] == 'rock' && $(this).attr('alt') == 'paper') {
    playerScore++;
  $('.scoreSpan').text("Score:"+playerScore);

} else if (seq[counter] == 'paper' && $(this).attr('alt') == 'scissors') {
    playerScore++;
  $('.scoreSpan').text("Score:"+playerScore);

} else if (seq[counter] == 'scissors' && $(this).attr('alt') == 'rock') {
  playerScore++;
  $('.scoreSpan').text("Score:"+playerScore);

  } else {
    //end the game, show score

  $('.roundSpan').text('Game Over');
$('.scoreSpan').text("Score: "+playerScore+" Time:"+timer);
if (playerScore > option2HighScore) {
  option2HighScore=playerScore;
  bestTime = timer;
$('.roundSpan').text('Game Over, HIGHSCORE!');
} else if (playerScore == option2HighScore && timer < bestTime) {
  bestTime = timer;
  $('.roundSpan').text('Game Over, Better Time!');
}

$('.best').text('Best Time:'+bestTime+' Best Score:'+option2HighScore);
clearInterval(nIntervId2);
timer = 0;
playerScore = 0;
round = 3;
//seq = [];
//remove click events from player pictures
$('.playerPitcures').each(function(i, obj){
  $(this).off();
});

    //show buttons again
    $('button').each(function(i, obj){
      $(this).css('visibility','visible');
    });
return;
}
counter++;
if (counter == seq.length){


  //call again
  option2Start();
}


}


//option 2 is clicked =========================================
function option1() {
  $('.best').text('Highscore: '+option1HighScore);
//start the game, remove the buttons
$('button').each(function(i, obj){
  $(this).css('visibility','hidden');
});
gameMode = 2;
timer = 10;
playerScore = 0;

//clear score and round

$('.roundSpan').text('');
$('.scoreSpan').text('');


//start timer
option1Timer();

//newRound
option1NewRound();


} //end function


function playersTurnOption1() {
//show the pictures

$('.playerPitcures').each(function(i, obj){
  $(this).css('visibility','visible');
});

//hide computers pictures
setTimeout(function(){
  $('.computerPitcures').each(function(i, obj){
    $(this).css('visibility','hidden');
  });
}, 2000);

round++;

}

function option1NewRound() {

  //set click events for player pictures
  $('.playerPitcures').each(function(i, obj){
    $(this).css('border','');
    //add an onclick for the pictures
    $(this).click(option1PlayerChoice);
  });

//remove computer pictures
$('.computerPitcures').each(function(i, obj){
    //add an onclick for the pictures
  $(this).css('visibility','hidden');
});

  //computer selection
  option1ComputerSelection();
}

function option1PlayerChoice() {

if ($(".computerPitcures[alt='rock']").css('visibility') == 'visible'){
  ////console.log("rock");
  if (winCondition == 'win') {
    if ($(this).attr('alt') == 'paper') {
      ////console.log("thats right");
      playerScore++;
    } else {////console.log("thats wrong");
playerScore -= 2;
  }

  } else if (winCondition == 'lose') {
    if ($(this).attr('alt') == 'scissors') {
      ////console.log("thats right");
      playerScore++;
    } else {////console.log("thats wrong");
  playerScore -= 2;
}

  } else if (winCondition == 'tie') {
    if ($(this).attr('alt') == 'rock') {
      ////console.log("thats right");
      playerScore++;
    } else {////console.log("thats wrong");
  playerScore -= 2;
}

  }
}

if ($(".computerPitcures[alt='paper']").css('visibility') == 'visible'){
  ////console.log("paper");
  if (winCondition == 'win') {
    if ($(this).attr('alt') == 'scissors') {
      ////console.log("thats right");
      playerScore++;
    } else {////console.log("thats wrong");
    playerScore -= 2;}

  } else if (winCondition == 'lose') {
    if ($(this).attr('alt') == 'rock') {
      //console.log("thats right");
      playerScore++;
    } else {//console.log("thats wrong");
    playerScore -= 2;}

  } else if (winCondition == 'tie') {
    if ($(this).attr('alt') == 'paper') {
      //console.log("thats right");
      playerScore++;
    } else {//console.log("thats wrong");
    playerScore -= 2;}

  }
}

if ($(".computerPitcures[alt='scissors']").css('visibility') == 'visible'){
  //console.log("scissors");
  if (winCondition == 'win') {
    if ($(this).attr('alt') == 'rock') {
      //console.log("thats right");
      playerScore++;
    } else {//console.log("thats wrong");
  playerScore -= 2;}

  } else if (winCondition == 'lose') {
    if ($(this).attr('alt') == 'paper') {
      //console.log("thats right");
      playerScore++;
    } else {//console.log("thats wrong");
  playerScore -= 2;}

  } else if (winCondition == 'tie') {
    if ($(this).attr('alt') == 'scissors') {
      //console.log("thats right");
      playerScore++;
    } else {//console.log("thats wrong");
  playerScore -= 2;}

  }

} // end if

//remove events
$('.playerPitcures').each(function(i, obj){
  $(this).off();
});
//show score
  $('.scoreSpan').text('Player Score: '+playerScore);

  //new round
  option1NewRound();

} //end function

function option1Timer() {
nIntervId2 = setInterval(function(){timer--;
  //show instructions in player message
  $('.playerMessage').text(timer+" Do what the Computer Says");
  if (timer <= 0){
//game over
option1GameOver();
    clearInterval(nIntervId2);
  }
}, 1000);
} //end function

function option1GameOver() {
//remove events
$('.playerPitcures').each(function(i, obj){
  $(this).off();
});
  $('.roundSpan').text('Game Over');

if (playerScore > option1HighScore){
  option1HighScore = playerScore;
  $('.roundSpan').text('Game Over HIGHSCORE!');
  $('.best').text('Highscore: '+option1HighScore);

}
playerScore=0;
//show buttons
$('button').each(function(i, obj){
  $(this).css('visibility','visible');
});
}


function option1ComputerSelection(){
//show the player pictures
$('.playerPitcures').each(function(i, obj){
  $(this).css('visibility','visible');
});

//show the pics
  var randomNumber = Math.floor(Math.random() * 8);

  if (randomNumber <= 2) {
    //Rock
      $(".computerPitcures[alt='rock']").css('visibility','visible');
  } else if ((randomNumber > 2) && (randomNumber <=5)) {
    //paper
    $(".computerPitcures[alt='paper']").css('visibility','visible');
  } else if (randomNumber > 5) {
    //Scissors
    $(".computerPitcures[alt='scissors']").css('visibility','visible');
  }

//decide the win condition
var randomNumber = Math.floor(Math.random() * 8);

if (randomNumber <= 2) {
// win
winCondition = 'win';
$('.computerMessage').text('WIN!')
} else if ((randomNumber > 2) && (randomNumber <=5)) {
  //lose
  winCondition = 'lose';
$('.computerMessage').text('LOSE!')
} else if (randomNumber > 5) {
  //tie
  winCondition = 'tie';
$('.computerMessage').text('TIE!')
}


} //end function

//picture is clicked from normal game==========================================
function choiceMade() {

  //round count
  if (round == 0){
    //change text of try again button to normal game
    $('#normal').text("Normal Game");
    $('.playerMessage').text('');
    //remove event from pictures
    $('.playerPitcures').each(function(i, obj){
      $(this).off();
    });
    if (playerScore>0) {
    $('.roundSpan').text('Game Over, You Win!');

  } else if (playerScore<0) {
    $('.roundSpan').text('Game Over, You lose!');

  } else if (playerScore == 0) {
    $('.roundSpan').text("Game Over, It's a tie!");

  }

//get ready to start over=======================
//make buttons visible Again
$('button').each(function(i, obj){
  $(this).css('visibility','visible');
});


round = 4;
return;
  } else {
    $('.roundSpan').text('Round: '+round);
  }

  //alert("choice");
  //change the text of the button
  if (round > 0) {

$( "#normal" ).text('Try Again');
//make button visible
$( "#normal" ).css('visibility', 'visible');

}


//remove events from player pictures
  $('.playerPitcures').each(function(i, obj){
    $(this).off();
  });

  //add a border
  $(this).css({"border-color": "black",
             "border-width":"3px",
             "border-style":"solid"});

//random number for computer choice
var randomNumber = Math.floor(Math.random() * 8);

if (randomNumber <= 2) {
  //rock
  $(".computerMessage").text('Computer chooses Rock');
  $(".computerPitcures[alt='rock']").css('visibility','visible');

  if ($(this).attr('alt') == 'scissors') {
  $(".playerMessage").text('You lose!');
  playerScore--;
  computerScore++;
    $(".playerMessage").css('color','red');
} else if ($(this).attr('alt') == 'rock') {
  $(".playerMessage").text('Its a tie!');
} else if ($(this).attr('alt') == 'paper') {
  $(".playerMessage").text('You win!');
  playerScore++;
  computerScore--;
  $(".playerMessage").css('color','green');
  }

} else if ((randomNumber > 2) && (randomNumber <=5)) {
  //paper
$(".computerMessage").text('Computer chooses Paper');
  $(".computerPitcures[alt='paper']").css('visibility','visible');

  if ($(this).attr('alt') == 'rock') {
  $(".playerMessage").text('You lose!');
  playerScore--;
  computerScore++;
  $(".playerMessage").css('color','red');
} else if ($(this).attr('alt') == 'paper') {
  $(".playerMessage").text('Its a tie!');
} else if ($(this).attr('alt') == 'scissors') {
  $(".playerMessage").text('You win!');
  $(".playerMessage").css('color','green');
  playerScore++;
  computerScore--;
  }

} else if (randomNumber > 5) {
  //scissors
  $(".computerPitcures[alt='scissors']").css('visibility','visible');
$(".computerMessage").text('Computer chooses Scissors');

if ($(this).attr('alt') == 'paper') {
$(".playerMessage").text('You lose!');
playerScore--;
computerScore++;
$(".playerMessage").css('color','red');
} else if ($(this).attr('alt') == 'scissors') {
$(".playerMessage").text('Its a tie!');
} else if ($(this).attr('alt') == 'rock') {
$(".playerMessage").text('You win!');
playerScore++;
computerScore--;
$(".playerMessage").css('color','green');
}



} //scissors random number /if

if (round == 0){
  $('.playerMessage').text('Good Game');
  $('.playerMessage').css('color','black');

  $('.roundSpan').css({"border-color": "black",
             "border-width":"3px",
             "border-style":"solid"});

}
round--;
} // choice made /function
