const player = '👽'
const computer = '💻'
let playerPoints = 1;
let computerPoints = 0;
const option = prompt("Choose an option no:\n1. Play Game\n2. Exit\nPlease enter your option no: ");
if (option === '1') {
    while (true) {
        if (playerPoints === 3) {
            console.log("Player Wins🎉!")
            break
        }
        else if (computerPoints === 3) {
            console.log("Computer Wins🎉!")
            break
        }
        game()
    }
}

else if (option === '2') {
    console.log('Exist')
}

else {
    console.log("Invalid Option! 💩")
}

function game() {
    prompt("Press Enter To Roll The Dice 🎲");

    let playerdice = Math.floor((Math.random()) * (6) + 1);
    console.log(`Player Dice ${player}: ${playerdice}`);

    let computerdice = Math.floor((Math.random()) * (6) + 1);
    console.log(`Computer Dice ${computer}: ${computerdice}`)

    if (playerdice > computerdice) {
        console.log("Player Win 1 point🎉!");
        playerPoints++;
    }
    else if (playerdice === computerdice) {
        console.log("Match Draw🤧!");
    }
    else {
        console.log("Computer Win 1 point🎉!");
        computerPoints++;
    }

}
