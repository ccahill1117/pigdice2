// Business Logic for Dice Game
function Player(roll, temp, total) {
  this.roll = 0,
  this.temp = 0,
  this.total = 0
}

function RollDice() {
  return Math.floor(Math.random()*6)+1;
}

Player.prototype.Roll = function(Roll) {
  if (Roll > 1 && Roll <= 6) {
    this.roll = Roll;
  }
  else if (Roll = 1) {
    this.roll = 0;
    alert("you rolled a one! your turn is over.");
  }
  return this.roll;
  // this.roll.push(this.temp);
}

Player.prototype.Temp = function() {
  if (this.roll > 1 && this.roll <= 6) {
    this.temp += this.roll;
  }
  else if (this.roll = 1) {
    this.temp = 0;
  }
}

Player.prototype.Hold = function() {
  this.total += this.temp;
  this.roll = 0;
  this.temp = 0;
}

Player.prototype.NewGame = function(){
  this.total = 0;
  this.temp = 0;
  this.turn = 0;
}

Player.prototype.CheckForHundred = function(){
  if(this.total >= 100){
    console.log("This Player is the winner")
  }
}

function attachClickListeners() {
  $("#click").on("click", "button", function() {
    CurrentRoll.CurrentRoll(this.id);
  });
}

var Player1 = new Player;
var Player2 = new Player;


$(document).ready(function() {
  $("#PlayerOneRoll").click(function(event) {

  Player1.Roll(RollDice());
  $("#diceRoll").html("<img src=img/" + Player1.Roll(RollDice()) + ".png>");
  Player1.Temp();
  $("#currentRollOne").text(Player1.roll);
  $("#turnTotalOne").text(Player1.temp);

   });

  $("#PlayerOneHold").click(function(event) {
    // Player1.roll = RollDice();
  Player1.Hold();
  $("#totalScoreOne").text(Player1.total);
  Player1.CheckForHundred();


});

$("#PlayerTwoRoll").click(function(event) {

  Player2.Roll(RollDice());
  $("#diceRoll").html("<img src=img/" + Player2.Roll(RollDice()) + ".png>");

  Player2.Temp();
  $("#currentRollTwo").text(Player2.roll);
  $("#turnTotalTwo").text(Player2.temp);



 });

$("#PlayerTwoHold").click(function(event) {
  // Player1.roll = RollDice();
Player2.Hold();
$("#totalScoreTwo").text(Player2.total);
Player2.CheckForHundred();
console.log(Player2.roll);
console.log(Player2.temp);
console.log(Player2.total);

});



})
