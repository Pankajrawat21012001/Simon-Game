var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;
var started = true;

function startOver() {
  location.reload();
}

function checkAnswer(currentLevel) {
  if (currentLevel < gamePattern.length - 1) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {} else {
      playSound('wrong');
      // console.log('wrong1');
      $("body").addClass('game-over');
      setTimeout(function() {
        $("body").removeClass('game-over');
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        startOver();
      }, 1000);
    }
  } else {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();
      }, 1000);
      level++;
      $("#level-title").text("Level " + level);
    } else {
      playSound('wrong');
      // console.log('wrong2');
      $("body").addClass('game-over');
      setTimeout(function() {
        $("body").removeClass('game-over');
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        startOver();
      }, 1000);
    }
  }
}

$(document).keypress(function() {
  if (started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = false;
  } else {

  }

});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  // console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];

  // console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);

  // console.log(gamePattern);
  // $("#"+gamePattern[0]).animate({opacity:0.1});
  // setTimeout($("#"+gamePattern[0]).animate({opacity:1}),1);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}


function playSound(name) {
  var nextSequenceAudio = new Audio("sounds/" + name + ".mp3");
  nextSequenceAudio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}


$('.btn').click(function() {
  var userChosenColour = this.id;
  // console.log(userChosenColour);

  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // console.log(userClickedPattern.length-1);
  // console.log(userClickedPattern);
  var last_index = userClickedPattern.length - 1;
  checkAnswer(last_index);
})
