// Business Logic for Players
function Players() {
  this.players = [],
  this.playerId = 0
}

Players.prototype.addPlayer = function(player) {
  player.Id = this.playerID();
  this.players.push(player);
}

Players.prototype.playerID = function() {
  this.playerId += 1;
  return this.playerId;
}


//Bussiness Logic for Player
function Game() {
  this.roll = 0,
  this.temp = 0,
  this.total = 0,
  this.turn = 0
}

Game.prototype.NewGame = function() {
  this.roll = 0;
  this.temp = 0;
  this.total = 0;
  this.turn = 0;
}

Game.prototype.CheckForHundred = function(){
  if(this.total >= 100){
    alert("This Player is the winner");
  }
}

Game.prototype.SwitchTo = function() {
  this.turn = "it's your turn";
}

Game.prototype.SwitchOff = function() {
  this.turn = "it's NOT your turn";
}

Game.prototype.WhosTurn = function(player) {
  if (this.turn === 1) {
    return "It's your turn!"
  }
  else if (this.turn === 0) {
    return "It's NOT your turn!"
  }
}

Game.prototype.Roll = function(Roll) {
  if (Roll === 1) {
    this.roll = 0;
    this.temp = 0;
    this.turn = 0;
    // this.turn = "it's NOT your turn";
    alert("it's NOT your turn");
  }
  else if (Roll > 1 && Roll <= 6) {
    this.roll = Roll;
    // this.turn = "it's Your turn";
  }
  return this.roll;
  return this.turn;

}

Game.prototype.Temp = function() {
  // if (this.roll > 1 && this.roll <= 6) {
    this.temp += this.roll;
  // }
  // else if (this.roll === 1) {
  //   this.temp = 0;
  // }
}

Game.prototype.Hold = function() {
  this.total += this.temp;
  this.roll = 0;
  this.temp = 0;
}

function RollDice() {
  return Math.floor(Math.random()*6)+1;
}

function displayPlayerDetails(playersToDisplay) {
  var playersList = $("div#playersHere");
  var htmlForPlayerInfo = "";
  playersToDisplay.players.forEach(function(player) {
    htmlForPlayerInfo += "<div><p>" +  "<br>" + "roll score:" + Game.roll + "<br>" + "temp score:" + Game.temp + "<br>" + "total score:" + Game.total + "<br>" + Game.turn + "</p></div>";
  })
  playersList.html(htmlForPlayerInfo);
};

var players = new Players;

var Player1 = new Game;
var Player2 = new Game;

var turnSwitch1 = function(roll) {
  if (roll === 1) {
    Player2.turn = 1;
  }
    else {
    Player2.turn = 0;
    }

  return Player2.turn;
}

//User Interface Logi
$(document).ready(function() {
  // $("#newPlayer").submit(function(event) {
  //   event.preventDefault();
  //   var inputtedPlayerName = $("input#newName").val();
  //   $("input#newName").val("");
  //   var newPlayer = new Game(inputtedPlayerName);
  //   players.addPlayer(newPlayer);
  //   displayPlayerDetails(players);
  // });
  //
  // $("#rollButton").click(function(event) {
  //   Game.Roll(RollDice());
  //   Game.Temp();
  //   displayPlayerDetails(players);
  //
  // });

  $("#PlayerOneRoll").click(function(event) {
    // $("#turnOne").text("It's Your Turn");
    // $("#turnTwo").text("It's Not Your Turn");
    // $("#turnOne").text("It's Your Turn");
    // $("#turnTwo").text("It's Not Your Turn");
    Player1.Roll(RollDice());
    Player1.Temp();
    $("#diceRoll").html("<img src=img/" + Player1.roll + ".png>");
    $("#currentRollOne").text(Player1.roll);
    $("#turnTotalOne").text(Player1.temp);
    turnSwitch1(Player1.roll);



    // $("#turnOne").text(Player1.turn);
    $("#turnTwo").text(Player2.turn);

 });

  $("#PlayerOneHold").click(function(event) {
    Player1.Hold();
      // alert("It's Now Player2's Turn");
    // Player1.SwitchOff();
    // $("#turnOne").text(Player1.turn);
    // Player2.SwitchTo();
    // $("#turnTwo").text(Player2.turn);
    $("#totalScoreOne").text(Player1.total);
    Player1.CheckForHundred();
     $("#playerOneScore").text(Player1.total);
     // $("#turnOne").text("It's Not Your Turn");
     // $("#turnTwo").text("It's Your Turn");
   });

   $("#PlayerTwoRoll").click(function(event) {
     $("#turnOne").text("It's Not Your Turn");
     $("#turnTwo").text("It's Your Turn");
    Player2.Roll(RollDice());
    $("#diceRoll").html("<img src=img/" + Player2.roll + ".png>");
    Player2.Temp();
    $("#currentRollTwo").text(Player2.roll);
    $("#turnTotalTwo").text(Player2.temp);
    // $("#turnTwo").text(Player2.turn);
  });

  $("#PlayerTwoHold").click(function(event) {
    Player2.Hold();
    // alert("It's Now Player1's Turn");
    $("#totalScoreTwo").text(Player2.total);
    Player2.CheckForHundred();
    $("#playerTwoScore").text(Player2.total);
    // Player2.SwitchOff();
    // $("#turnTwo").text(Player2.turn);
    // Player1.SwitchTo();
    // $("#turnOne").text(Player1.turn);
    // $("#turnOne").text("It's Your Turn");
    // $("#turnTwo").text("It's Not Your Turn");
  });

  $("#startGame").click(function(event) {
    Player1.NewGame();
    Player2.NewGame();
    $("#currentRollOne").text("");
    $("#turnTotalOne").text("");
    $("#totalScoreOne").text("");

    $("#currentRollTwo").text("");
    $("#turnTotalTwo").text("");
    $("#totalScoreTwo").text("");

    $("#playerOneScore").text("");
    $("#playerTwoScore").text("");

    Player1.turn = 1;
    Player2.turn = 0;
    // WhosTurn(Player1);
    $("#turnOne").text(Player1.turn);
    // WhosTurn(Player2);
    $("#turnTwo").text(Player2.turn);
  })
})
