var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
colorDisplay.textContent = pickedColor;
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.getElementsByClassName("mode");


init();

function init() {
    setupModeButtons(); // set up mode button listeners;
    setupSquares(); // set up squares listener;
    resetButton.addEventListener("click", reset);
    reset();
}

function setupModeButtons(){
    // add mode button listeners;
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            for (let j = 0; j < modeButtons.length; j++) {
                modeButtons[j].classList.remove("selected");
            }
            this.classList.add("selected");
            numSquares = (this.textContent === "Easy") ?  3 : 6;
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add click event to squares
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.backgroundColor = pickedColor;
                resetButton.textContent = "Play Again?"
            } else {
                this.style.background = "#232323";  // set it the same to the background
                messageDisplay.textContent = "Try Again!"
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            // add initial colors to squares
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            // 使得后面的不显示
            squares[i].style.display = "none";
        }
        
    }
}

// change all squares' color
function changeColors(color) {
    for (square of squares) {
        square.style.backgroundColor = color;
    }
}

function generateRandomColors(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
        // pick a random color
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    // the value of r, g, b should be int within the range [0, 255]
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", "+ g + ", "+ b + ")";
}

// randomly pick a color from the color array
function pickColor() {
    var randomIndex =  Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}