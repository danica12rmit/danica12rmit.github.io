

//Video player:
const video = document.querySelector("#custom-video-player"); //Selecting different elements using its class from HTML file. 
const playPauseBtn = document.querySelector("#play-pause-btn");   
const playPauseImg = document.querySelector("#play-pause-img");
const progressBar = document.querySelector("#progress-bar-fill");
video.removeAttribute("controls"); //Removes the default browser video control to use my own play button
// playPauseBtn.addEventListener("click", togglePlayPause);
video.addEventListener("timeupdate", updateProgressBar); //Updates the progress bar as the video updates
function togglePlayPause() { //Switches between play and pause 
  if (video.paused || video.ended) {  //If video is paused or ended it plays the video 
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";  //Change icon to pause because video is now playing
  } else { //Otherwise (video is currently playing), it pauses the video
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
  }  //Change icon to play because video is now paused
}
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100; //Converts time into percentage
  progressBar.style.width = value + "%"; //Fills the bar visually
}


//Pomodoro timer

//Mode buttons for pomodoro
const modeButtons = document.querySelectorAll(".mode-btn"); //Selects all mode buttons 

modeButtons.forEach(btn => { //Go through each button in modeButtons, one by one and run this code for each one
  btn.addEventListener("click", () => { //When modeButtons clicked

    //It will remove highlight from all mode buttons
    modeButtons.forEach(b => b.classList.remove("active"));

    //It adds highlight to the clicked button
    btn.classList.add("active");

  });
});

//Default mode is focus
let time = 25 * 60; //Time variable and converts 25 minutes in seconds
let timer; //This will store your setInterval so it can stop the timer later
let running = false; //Tracks whether timer is currenttly running, prevents mutiple timers from stacking
let mode = "focus"; //This is the focus mode which will be 25 minutes of work. 








const display = document.getElementById("timer"); //Finds HTML element with id "timer"

function updateDisplay() { //Creates a function that updates the timer text on screen
  const minutes = Math.floor(time / 60); //Converts seconds to full minutes
  const seconds = time % 60; //Gets leftover seconds after minutes
  display.textContent =  //Changes what is shown inside the timer box
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; //Formats time with a 0, e.g 5:09 instead of 5:9
}




function setLongBreak() { //Creates long break function
  time = 15 * 60; //Sets the timer to 15 minutes
  mode = "longBreak";

  document.body.classList.add("long-break"); //Adds CSS class to change background colour
  document.body.classList.remove("focus", "break"); //Removes other modes so only current mode styling shows

  updateDisplay();
}


function setFocus() { //Creates focus function
  time = 25 * 60; //Sets the timer to 25 minutes
  mode = "focus"; //Saves current mode so Javascript knows what mode you're in

  document.body.classList.add("focus"); 
  document.body.classList.remove("break", "long-break");

  updateDisplay(); //Updates timer text instantly
}

function setBreak() { //Creates short break function
  time = 5 * 60; //Sets the timer to 5 minutes
  mode = "break";

  document.body.classList.add("break");
  document.body.classList.remove("focus", "long-break");

  updateDisplay();
}


function pauseTimer() { //Pause timer, whicih can stop timer temporarily
  clearInterval(timer); //Stops countdown loop completely
  running = false; //Allows timer to be started again

  document.body.classList.remove( //Removes all visual modes to orignal background colour shows
    "focus",
    "break",
    "long-break"
  );
}

//Reset button 
function resetTimer() { //Reset timer value
  clearInterval(timer); //Stops timer

  time = 25 * 60; //Resets timer to 25 minutes
  running = false; //Allows timer to be restarted

  document.body.classList.remove( //Remove all modes to go back to original background colour
    "focus",
    "break",
    "long-break"
  );

  updateDisplay();
}
 

const buttons = document.querySelectorAll(".timer-buttons button"); //Selects all buttons inside timer section

buttons.forEach(btn => { //Loops through each button
  btn.addEventListener("click", () => { //Runs code when button is clicked

    // remove highlight from all buttons
    buttons.forEach(b => b.classList.remove("active"));

    // add highlight to clicked button
    btn.classList.add("active");
  });
});


//Focus Mode

function startTimer() { //Starts countdown
  if (running) return;  //Stops multiple timers running at once

  running = true; //Marks timer as active


if (mode === "focus") {
  document.body.classList.add("focus"); //Set focus mode color immediately when timer starts
  document.body.classList.remove("break", "long-break"); //Removes other styling from break mode
}



  timer = setInterval(() => { //Runs code every 1 second
    time--; //Subtracts 1 second
    updateDisplay(); //Updates timer on screen

    if (time <= 0) { //When timer reaches 0
      clearInterval(timer); //Stops timer
      running = false; //Alows user to restart timer

    if (mode === "focus") { //If focus finished, switches to short break 
  setBreak();
} else {
  setFocus();  //If short break finishes, it switches to short break 
}
    }
  }, 1000); //Runs code every one second
}


//Motivational Quotes

const quotes = [ //List of motivationl quotes
  "Stay focused, you’re doing great.",   //Each string is one quote
  "Small steps every day lead to big results.",
  "Discipline is choosing what you want most.",
  "You don’t have to be perfect, just consistent.",
  "Focus on progress, not perfection.",
  "One task at a time.",
  "You are capable of more than you think."
];

function newQuote() { //Function to generate random quote
  const randomIndex = Math.floor(Math.random() * quotes.length); //Picks random number based on array size
  document.getElementById("quote").textContent = quotes[randomIndex]; //Displays selected quote on screen
}
