var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("h1").text("Game Over,Press any key to restart");
    wrongAnswerAnimation();
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();
    startOver();
  }
}

function animatePress(currentColour) {
  var delayInMilliseconds = 100;
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, delayInMilliseconds);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function wrongAnswerAnimation() {
  var delayInMilliseconds = 200;
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, delayInMilliseconds);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  level++;
  $("#level-title").text("Level " + level);
  gamePattern.push(randomChosenColour);
  $("#" + buttonColours[randomNumber])
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  makeSound(randomChosenColour);
}

//function to make a sound based on color
function makeSound(name) {
  switch (name) {
    case "blue":
      var audio = new Audio("./sounds/blue.mp3");
      audio.play();
      break;
    case "green":
      var audio = new Audio("./sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("./sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("./sounds/yellow.mp3");
      audio.play();
      break;

    default:
      console.log("error");
      break;
  }
}

//event listener Click
$(".btn").on("click", function (event) {
  var userChosenColour = $(event.target).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// event listener for keyboard touch
$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
