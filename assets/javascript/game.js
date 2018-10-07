    // set up the screen display updates
    var currGuessText = document.getElementById("currGuess");
    var lettersUsedText = document.getElementById("lettersUsed");
    var remGuessesText = document.getElementById("remGuesses");
    var gameWinsText = document.getElementById("gameWins");
    var gameLossesText = document.getElementById("gameLosses");
    var feedBackText = document.getElementById("feedBack");

    // set up match variables 
    var numWins = 0;
    var numLosses = 0;

    // set up game variables
    // number of guesses allowed in a game
    var guessesAllowed = 6;
    // the users guess - an individual keystroke
    var userGuess = "";
    // this holds the random word generated at beginning of a game
    var randomWord = [];
    // this holds the list of the letters the user has tried
    var lettersUsed = [];
    // this is the blank version of the randomWord - so if randomWord is 5 characters long
    // then currGuess will be made to be same length starting with "_ _ _ _ _"
    // it will be updated as the user matches letters the randomWord
    var currGuess = [];

    // get a random word from our list of words (confirmed)
    function getRandomWord() {
      var wordList = ["DOG","BIRD","MOOSE","CAT","HORSE","COW","PIG"];
      return wordList[Math.floor(Math.random() * wordList.length)];
    }

    // Check to see if this letter already been played (confirmed)
    // this function expects userGuess and lettersUsed to be global 
    function isRepeat() {
      var i = 0;
      for (i = 0; i < lettersUsed.length; i++) {
        if (userGuess.toUpperCase() === lettersUsed[i].toUpperCase()) {
          feedBackText.textContent = "This letter was already used. Please make another selection.";
          return true;
        }
      }
      return false;
    }

    // Is the key A-Z or a-z (confirmed) 
    function isInvalidChar() {
      var validChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      if (validChar.indexOf(userGuess) === -1) {
        feedBackText.textContent = "You entered an invalid character. Please make another selection.";
        return true;
      }
    }

    // Player makes a valid guess and we have to match which letters they have guessed
    function updateCurrGuess() {
      var i = 0;
      for (i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === userGuess) {
          currGuess[i] = userGuess;
        }
      }
      currGuessText.textContent = currGuess;
    }

    // check to see if the letter guessed is in the random word
    function isMatch() {
      var i = 0;
      for (i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === userGuess) {
          currGuess[i] = userGuess;
          return true;
        }
      }
      return false;
    }

    // run a new match
    function playMatch() {
      // set up the new match
      numWins = 0;
      numLosses = 0;
      var newGame = true;
      while (newGame) {
        newGame = playGames();
      }
    }

    function playGames() {
      // start a new GAME
      var isGameOver = true;
      userGuess = "";
      guessesAllowed = 6;
      // update message area
      gameWinsText.textContent = "Wins: " + numWins;
      gameLossesText.textContent = "Losses: " + numLosses;
      remGuessesText.textContent = "You have " + guessesAllowed + " guesses remaining.";

      // when the user makes a letter guess we will add it to this string and 
      // display it so they can see the guesses they already made
      lettersUsed = [];

      // get a random word 
      randomWord = getRandomWord();

      // create a blank word that is the same length as the randomWord but where
      // each character is initially an underline "_" placeholder so we can use it to 
      // display progress to the player
      currGuess = [];
      for (i = 0; i < randomWord.length; i++) {
        currGuess.push("_");
      }
      currGuessText.textContent = currGuess;

      // await a keystroke - this function is run whenever the user presses a key.
      // determine if the key that was pressed is valid
      // turn it in to a variable quickly in case they hit another key
      feedBackText.textContent = "Press any key from A-Z, a-z to continue guessing this word.";
      document.onkeyup = function (event) {
        userGuess = event.key;
        // determine if it is a valid guess
        if (isInvalidChar()) {
          // function will update display message area- we do nothing but wait for next key
        } else if (isRepeat()) {
          // function will update display massage area - we do nothing but wait for next key
        } else {
          // process the players letter which we know is a valid guess
          userGuess = userGuess.toUpperCase();
          guessesAllowed -= 1;
          remGuessesText.textContent = "You have " + guessesAllowed + " guesses remaining.";
          lettersUsed = lettersUsed + userGuess;
          lettersUsedText.textContent = lettersUsed;
          if (!isMatch()) {
            // the letter selected is not a match to our word
          } else {
            // the letter selected is a match so update their guess
            updateCurrGuess();
            // lets still share it with them so they know they used it
            currGuessText.textContent = currGuess;
          }
        }

        // check to see if the game is over - the user guessed the word
        isGameOver = true;
        for (k = 0; k < currGuess.length; k++) {
          // if more unguessed letters
          console.log(currGuess[k]);
          if (currGuess[k] === "_") {
            // then the game is not over because there are still "_" in the currGuess
            isGameOver = false;
          }
        }

        if (isGameOver) {
          if (guessesAllowed == 0) {
            // see if the game is over on guesses
            // if the word is not guessed yet - see if the user is out of guesses  
            numLosses += 1;
            gameLossesText.textContent = "Losses: " + numLosses;
            feedBackText.textContent = "Sorry - Better luck next game!";
            return true;
          } else {
            // then the game is a win
            numWins += 1;
            gameWinsText.textContent = "Wins: " + numWins;
            feedBackText.textContent = "GREAT JOB - YOU WIN";
            return true;
          }
        }
      }
    }

    // enable the quit button 
    document.getElementById("quitButton").onclick = function () {
      playerQuits();
    }

    //start a new match
    document.getElementById("playButton").onclick = function () {
      playMatch();
    }