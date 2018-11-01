// Business Logic for Players
function Players() {
  this.players = [],
  this.playerId = 0
}

Players.prototype.addPlayer = function(player) {
  player.Id = this.playerID();
  console.log(player.Id);
  this.players.push(player);
}

Players.prototype.playerID = function() {
  this.playerId += 1;
  return this.playerId;
}


//Bussiness Logic for Game
function Game() {
  this.roll = 0,
  this.temp = 0,
  this.total = 0,
  this.turn
}

Game.prototype.NewGame = function() {
  this.roll = 0;
  this.temp = 0;
  this.total = 0;
  //this.turn = 0;
}

Game.prototype.CheckForHundred = function(){
  if(this.total >= 100){
    alert("This Player is the winner");
  }
}

Game.prototype.Roll1 = function(Roll) {
  if (Roll === 1) {
    this.roll = 0;
    this.temp = 0;
    this.turn = 0;
    $("#turnOne").text("It's NOT your turn");
    $("#turnTwo").text("It's your turn");
  }else if (Roll > 1 && Roll <= 6) {
    this.roll = Roll;
    $("#turnOne").text("It's your turn");
    $("#turnTwo").text("It's NOT your turn");
  }
  return this.roll;
  return this.turn;
}

Game.prototype.Roll2 = function(Roll) {
  if (Roll === 1) {
    this.roll = 0;
    this.temp = 0;
    this.turn = 0;
    $("#turnTwo").text("It's NOT your turn");
    $("#turnOne").text("It's your turn");
  }else if (Roll > 1 && Roll <= 6) {
    this.roll = Roll;
      $("#turnTwo").text("It's your turn");
      $("#turnOne").text("It's NOT your turn");
  }
  return this.roll;
  return this.turn;
}

Game.prototype.Temp = function() {
    this.temp += this.roll;
}

Game.prototype.Hold1 = function() {
  this.total += this.temp;
  this.roll = 0;
  this.temp = 0;
  $("#turnOne").text("It's NOT your turn");
  $("#turnTwo").text("It's your turn");
}

Game.prototype.Hold2 = function() {
  this.total += this.temp;
  this.roll = 0;
  this.temp = 0;
  $("#turnOne").text("It's your turn");
  $("#turnTwo").text("It's NOT your turn");
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

//User Interface Logic
$(document).ready(function() {
  $("#newPlayer").submit(function(event) {
    event.preventDefault();
    var inputtedPlayerName = $("input#newName").val();
    $("input#newName").val("");
    var newPlayer = new Game(inputtedPlayerName);
    players.addPlayer(newPlayer);
    displayPlayerDetails(players);
  });

  $("#PlayerOneRoll").click(function(event) {
    Player1.Roll1(RollDice());
    Player1.Temp();
    $("#diceRoll").html("<img src=img/" + Player1.roll + ".png>");
    $("#currentRollOne").text(Player1.roll);
    $("#turnTotalOne").text(Player1.temp);
    //$("#turnTwo").text(Player2.turn);
  });

  $("#PlayerOneHold").click(function(event) {
    Player1.Hold1();

    $("#totalScoreOne").text(Player1.total);
    Player1.CheckForHundred();
     $("#playerOneScore").text(Player1.total);
   });

   $("#PlayerTwoRoll").click(function(event) {
     // $("#turnOne").text("It's Not Your Turn");
     // $("#turnTwo").text("It's Your Turn");
    Player2.Roll2(RollDice());
    $("#diceRoll").html("<img src=img/" + Player2.roll + ".png>");
    Player2.Temp();
    $("#currentRollTwo").text(Player2.roll);
    $("#turnTotalTwo").text(Player2.temp);
  });

  $("#PlayerTwoHold").click(function(event) {
    Player2.Hold2();
    $("#totalScoreTwo").text(Player2.total);
    Player2.CheckForHundred();
    $("#playerTwoScore").text(Player2.total);

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
    $("#turnOne").text(Player1.turn);
    $("#turnTwo").text(Player2.turn);
  })
})
