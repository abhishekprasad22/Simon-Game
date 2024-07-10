// 3. Create an array of button colours.
var buttonColours = ["red", "blue", "green", "yellow"];

// 5.
var gamePattern = [];

//11. Array for user clicked pattern.
var userClickedPattern = [];

//18. Flag for tracking if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//19. Level counter
var level = 0;

//20. JQuery for detecting the keypresses so that nextSequence() can be called.
$(document).keypress(function(){
    if (!started){
        //21. After game will started "Press A Key to Start" will change to "Level 0"
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;

    }
})
// 9. Use JQuery to detect when buttons are clicked and run a handling func.
$(".btn").click(function(){

    //10. Store the id of the chosen button in another variable.
    var userChosenColour = $(this).attr("id");

    //12. Now push the userChosenColour to the userClickedPattern
    userClickedPattern.push(userChosenColour);
    //13. Function for playing the sound when clicked the button.
    playSound(userChosenColour);

    animatePress(userChosenColour);

    //29. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);
})

//24. Function for checking answer and take input as current level.
function checkAnswer(currentLevel){
    
    //25. Check if the user answer is same as gamePattern if it is same then log "success" and if not then log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        //26. If the user got the most recent answer right in the step 25 then again we have to check it whether they have finished their sequence or not.
        if (userClickedPattern.length === gamePattern.length){

            //27. Call nextSequence() after a 1000 millisecond delay
            setTimeout(function() {
                nextSequence()
            }, 1000)
        }
    }

    else{
        console.log("wrong");

        //30. If the answer get wrong then we play the wrong sound 
        playSound("wrong");

        //31. Then we turn the background red for the small fraction of time by adding and removing a class called game-over.
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)

        //32. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart") 

        //35. Call startOver() if the user gets the sequence wrong.
        startOver();
         
    }
    
}


// 1. Create a fuction called nextSequence() function.
function nextSequence(){

    //28. We have to reset the userClickedPattern to an empty array ready for the next level, once nextSequence() is triggered.
    userClickedPattern = [];


    //22. increment level by 1 whenever this function is called.
    level++;

    //23. Update the h1 with this change in the value of the level.
    $("#level-title").text("Level " + level);

    // 2. Create a random number generator from 1 to 4.
    var randomNumber = Math.floor(Math.random() * 4);

    //4. Create a variable which can hold random colours.
    var randomChosenColour = buttonColours[randomNumber];

    //6. Add the randomChosenColour into the gamePattern.
    gamePattern.push(randomChosenColour);

    //7. Select the button of the randomChosenColour and animate a flash on the selected botton.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //8. Play the sound of the selected button.
    playSound(randomChosenColour);

}

//14. Function for playing the sound.
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// 15. Function to animate the buttons when pressed.
function animatePress(currentColor){
    //16. Using JQuery add a class name "pressed" into the attributes of the pressed button.
    $("#" + currentColor).addClass("pressed");

    //17.Remove the pressed class after 100 miliseconds.
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//33.
function startOver(){
    //34. Reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}