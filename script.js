let outputDisplay = document.getElementById("outputDisplay");
let chancesLeftDisplay = document.getElementById("chancesdisplay");
let restartBtn = document.getElementById("restartbtn");
let submitBtn = document.getElementById("submitBtn"); // Fixed missing reference

restartBtn.onclick = function () {
    window.location.reload();
};

// Declare variables outside so they persist after clicking the button
let mininum, maximum, chance, answer;

// Start button click event
document.getElementById("btn").onclick = function () {
    console.log("Button clicked");

    // Get input values
    mininum = Number(document.getElementById("start").value);
    maximum = Number(document.getElementById("end").value);
    chance = Number(document.getElementById("chances").value);

    chancesLeftDisplay.textContent = `Chances left: ${chance}`;
    console.log(mininum, maximum, chance);

    // Validation checks
    if (document.getElementById("start").value === "" || 
        document.getElementById("end").value === "" || 
        document.getElementById("chances").value === "") {
        window.alert("Please fill all the fields");
        return; // Stop execution if fields are empty
    }

    if (mininum >= maximum) {
        window.alert("The minimum value must be less than the maximum value");
        return;
    }

    if (chance < 1) {
        window.alert("The number of chances must be greater than 0");
        return;
    }

    if (chance >= maximum - mininum + 1) {
        window.alert("The number of chances must be less than the range of numbers");
        return;
    }

    // Generate a random number
    answer = Math.floor(Math.random() * (maximum - mininum + 1)) + mininum;
    console.log(`Random number: ${answer}`);
};

// Submit button event (to handle guesses)
submitBtn.onclick = function () {
    if (chance > 0) {
        let userAnswer = Number(document.getElementById("guess").value);
        console.log("User guess:", userAnswer);

        if (userAnswer === answer) {
            outputDisplay.textContent = "🎉 Congratulations! You guessed right!";
            submitBtn.disabled = true; // Disable button after win
        } else if (userAnswer > answer) {
            outputDisplay.textContent = "⬇️ Try a lower number";
        } else {
            outputDisplay.textContent = "⬆️ Try a higher number";
        }

        chance--; // Reduce chance after checking
        chancesLeftDisplay.textContent = `Chances left: ${chance}`;

        if (chance === 0) {
            outputDisplay.textContent = `❌ Game over! The correct number was ${answer}`;
            submitBtn.disabled = true; // Disable button
        }
    }
};
