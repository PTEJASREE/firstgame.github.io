$('#level-title').text('Press A Key to Start');
var gamePattern=[];
var userClickedPattern=[];
var buttonColours=['red','blue','green','yellow'];
var start=false;
var level=0;
$(document).keydown(function(){
  if(!start){
    nextSequence();
    start=true;
  }
});


function nextSequence()
{
  level=level+1;
  $('#level-title').text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#'+randomChosenColour).fadeOut(50).fadeIn(100);
  playSound(randomChosenColour);

}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(patternMatch(userClickedPattern,gamePattern)){
      userClickedPattern=[];
      setTimeout(nextSequence(),1000);
    }
  }
  else{
    var wrong=new Audio('sounds/wrong.mp3');
    wrong.play();
    $('body').addClass('game-over');
    setTimeout(function(){
      $('body').removeClass('game-over');
    },200);
    $('#level-title').text('Game Over, Press Any Key to Restart')
    startOver();
  }
}
function startOver(){
    level=0;
  gamePattern=[];
  start=false;
  userClickedPattern=[];
}
function patternMatch(arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i<arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
   if(i===arr1.length){
   return true;
}
};
$('.btn').click(function(){
  var userChosenColour=this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  var n=userClickedPattern.push(userChosenColour)-1;
  handler(userChosenColour);
  checkAnswer(n);
});
function playSound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}
function handler(){
  //alert(cb);
}
function animatePress(currentColour)
{
  $('#'+currentColour).addClass('pressed');
  setTimeout(function(){
    $('#'+currentColour).removeClass('pressed');
  },100);
}
