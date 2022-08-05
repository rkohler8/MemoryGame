const gameContainer = document.getElementById("game");
const controlButts = document.querySelector('h2');
const infoText = document.querySelector('h3');
const scoreTracker = document.getElementById('curr-score');
const lScore = document.getElementById('low-score');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.style.backgroundColor = "#F0EAD6";

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let selects = [];
let matches = 11;
let score = 0;
let speedFlag = 0;
let seshBest = JSON.parse(localStorage.getItem("localBest"));

if(seshBest === null) {
  seshBest = 1000000;
  lScore.innerText = "Lo-Score: 0";
} else {
  lScore.innerText = "Lo-Score: " + (seshBest).toString();
}


//  Starting the game and reseting for new game
controlButts.addEventListener('click', function(e) {
  if(e.target.classList == 'start') {
    matches = 0;
    e.target.innerText = "New Game";
    e.target.setAttribute('class', 'new-game');
  } else if(e.target.classList == 'new-game') {
      while(gameContainer.lastElementChild) {
        gameContainer.removeChild(gameContainer.lastElementChild);
      }
      shuffledColors = shuffle(COLORS);
      createDivsForColors(shuffledColors);
      matches = 0;
      score = 0;
      scoreTracker.innerText = "Current Score: 0";
      infoText.innerText = ":)";
  } else if(e.target.classList == 'reset'){
    localStorage.clear();
    lScore.innerText = "Lo-Score: 0";
  }
});

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(matches < 10 && speedFlag === 0){
    scoreTracker.innerText = "Current Score: " + (score+=1).toString();
    if(event.target.classList == "matched" || event.target === selects[0]){
      alert("This Card Has Already Been Matched.");
    }
    else {
      event.target.style.backgroundColor = event.target.classList;
      selects.push(event.target);

      if(selects.length === 2) {
        if(selects[0].style.backgroundColor === selects[1].style.backgroundColor) {
            infoText.innerText = "That's a Match :)";
            infoText.style.color = "green";
            if(matches < 8){
              setTimeout(function() {
                infoText.innerText = ":)"
              },500);
            }
            selects[0].classList = "matched"; 
            selects[1].classList = "matched"; 
            selects = [];
            matches += 2;
        }
        else {
          infoText.innerText = "Not a Match! :/";
          infoText.style.color = "red";
          speedFlag = 1;
          setTimeout(function() {
            infoText.innerText = ":/";
            infoText.style.color = "black";
            selects[0].style.backgroundColor = "#F0EAD6";
            selects[1].style.backgroundColor = "#F0EAD6";
            selects = [];
            speedFlag = 0;
          }, 1000);
        }
        if(matches === 10) {
          infoText.innerText = "You Win!! Play again?"
          if(score < seshBest){
            infoText.innerText = "!!NEW RECORD!! Try Again?";
            seshBest = score;
            lScore.innerText = "Lo-Score: " + (score).toString();
            localStorage.setItem("localBest", JSON.stringify(score));
          }
        }
      }
    }
  }
}


// when the DOM loads
createDivsForColors(shuffledColors);

/* */