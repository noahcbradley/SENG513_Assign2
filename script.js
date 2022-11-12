
const ROWS = 4;
const COLUMNS = 4;
const BOARD_WIDTH = 750;
const BOARD_HEIGHT = 400;

PLAYER1_SCORE = 0;
PLAYER2_SCORE = 0;
PLAYER3_SCORE = 0;
CURRENT_PLAYER = 1;
LINE_ARRAY = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false];

var player = "null";
var playerScored = false;
var html = "";
drawInitialScores();
drawBoard();
playGame();

function drawInitialScores(){
  html += '<div class="score" style="left:540px; top:250px; color: red" player="1">Player Score: 0</div>';
  html += '<div class="score" style="left:765px; top:250px; color: green" player="2">Player Score: 0</div>';
  html += '<div class="score" style="left:990px; top:250px; color: blue" player="3">Player Score: 0</div>';
  html += '<div class="finalscore" style="left: 725px; top: 850px"></div>';
}

function drawBoard () {
  var lineid = 0;
  var boxid = 0;
  for(let i = 1; i <= ROWS; i++){
    for(let j = 1; j <= COLUMNS; j++){
      html += `<div class="dot" style="left:${440 + (i*150)}px; top:${170 + (j*140)}px"></div>`;
      if(i < ROWS){
        html += `<div class="line horizontalline" style="left:${460 + (i*150)}px; top:${183 + (j*140)}px" lineclicked="false" lineid="${lineid}"></div>`;
        lineid++;
      }
      if(j < COLUMNS){
        html += `<div class="line verticalline" style="left:${452 + (i*150)}px; top:${183 + (j*140)}px" lineclicked="false" lineid="${lineid}"></div>`;
        lineid++;
      }
      if(j < COLUMNS && i < ROWS){
        html += `<div class="box" style="left:${465 + (i*150)}px; top:${190 + j*143}px" boxmade="false" boxid="${boxid}"></div>`;
        boxid++;
      }
    }
    
  }
  $("#app").html(html);
}

function playGame () {

  if((PLAYER1_SCORE + PLAYER2_SCORE + PLAYER3_SCORE) == 9){
    determineWinner();
  }

  if(CURRENT_PLAYER == 1){
    player = "red";
  }
  if (CURRENT_PLAYER == 2){
    player = "green";
  }
  if (CURRENT_PLAYER == 3){
    player = "blue";
  }
  $("div.line").unbind('click').bind('click', function(){
    if(checkIfTaken(this)){
			$(this).addClass(player);
      $(this).attr("lineclicked", "true");
      updateLineArray(parseInt($(this).attr("lineid")));
      checkBox();
      if(playerScored == false){
        CURRENT_PLAYER += 1;
      }
      if(CURRENT_PLAYER == 4){
        CURRENT_PLAYER = 1;
      }
    }
    playGame();
	});
}

function checkIfTaken(line){
  var isClicked = $(line).attr("lineclicked") == "false";
  return isClicked;
}

function updateLineArray(lineindex){
  LINE_ARRAY[lineindex] = true;
}

function checkBox(){
  playerScored = false;
  $("div.box").each(function(){
    if(LINE_ARRAY[0] && LINE_ARRAY[1] && LINE_ARRAY[2] && LINE_ARRAY[8]){
      if($(this).attr("boxid") == 0 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[2] && LINE_ARRAY[3] && LINE_ARRAY[4] && LINE_ARRAY[10]){
      if($(this).attr("boxid") == 1 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[4] && LINE_ARRAY[5] && LINE_ARRAY[6] && LINE_ARRAY[12]){
      if($(this).attr("boxid") == 2 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[7] && LINE_ARRAY[8] && LINE_ARRAY[9] && LINE_ARRAY[15]){
      if($(this).attr("boxid") == 3 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[9] && LINE_ARRAY[10] && LINE_ARRAY[11] && LINE_ARRAY[17]){
      if($(this).attr("boxid") == 4 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[11] && LINE_ARRAY[12] && LINE_ARRAY[13] && LINE_ARRAY[19]){
      if($(this).attr("boxid") == 5 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[14] && LINE_ARRAY[15] && LINE_ARRAY[16] && LINE_ARRAY[21]){
      if($(this).attr("boxid") == 6 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[16] && LINE_ARRAY[17] && LINE_ARRAY[18] && LINE_ARRAY[22]){
      if($(this).attr("boxid") == 7 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    if(LINE_ARRAY[18] && LINE_ARRAY[19] && LINE_ARRAY[20] && LINE_ARRAY[23]){
      if($(this).attr("boxid") == 8 && $(this).attr("boxmade") == "false"){
        fillBox(this);
      }
    }
    updateScores();
  });

}

function fillBox(box){
  $(box).addClass(player);
  $(box).attr("boxmade", "true");
  if(CURRENT_PLAYER == 1){
    PLAYER1_SCORE += 1;
  }
  else if(CURRENT_PLAYER == 2){
    PLAYER2_SCORE += 1;
  }
  else{
    PLAYER3_SCORE += 1;
  }
  playerScored = true;
}

function updateScores(){

  $("div.score").each(function(){
    if($(this).attr("player") == "1" && CURRENT_PLAYER == 1){
      this.textContent = 'Player Score: ' + PLAYER1_SCORE;
    }
    else if($(this).attr("player") == "2" && CURRENT_PLAYER == 2){
      this.textContent = 'Player Score: ' + PLAYER2_SCORE;
    }
    else if($(this).attr("player") == "3" && CURRENT_PLAYER == 3){
      this.textContent = 'Player Score: ' + PLAYER3_SCORE;
    }
    else{

    }
  });

}

function determineWinner() {
  $("div.finalscore").each(function(){
    // Player 1 wins
    if(PLAYER1_SCORE > PLAYER2_SCORE && PLAYER1_SCORE > PLAYER3_SCORE){
      this.textContent = 'Player 1 wins!';
    }
    // Player 2 wins
    if(PLAYER2_SCORE > PLAYER1_SCORE && PLAYER2_SCORE > PLAYER3_SCORE){
      this.textContent = 'Player 2 wins!';
    }
    // Player 3 wins
    if(PLAYER3_SCORE > PLAYER2_SCORE && PLAYER3_SCORE > PLAYER1_SCORE){
      this.textContent = 'Player 3 wins!';
    }
    // Player 1 and 2 tie
    if(PLAYER1_SCORE == PLAYER2_SCORE && PLAYER1_SCORE > PLAYER3_SCORE){
      this.textContent = 'Player 1 and 2 win!';
    }
    // Player 2 and 3 tie
    if(PLAYER2_SCORE == PLAYER3_SCORE && PLAYER3_SCORE > PLAYER1_SCORE){
      this.textContent = 'Player 2 and 3 win!';
    }
    // Player 1 and 3 tie
    if(PLAYER1_SCORE == PLAYER3_SCORE && PLAYER3_SCORE > PLAYER2_SCORE){
      this.textContent = 'Player 1 and 3 win!';
    }
    // All Players tie
    if(PLAYER1_SCORE == PLAYER2_SCORE && PLAYER3_SCORE == PLAYER1_SCORE){
      this.textContent = 'All players tie!';
    }
  });
}





