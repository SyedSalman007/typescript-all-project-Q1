import inquirer from "inquirer";
import chalk from 'chalk';
function randomNumberGenerator(level) {
    if (level.toLowerCase() === 'normal') {
        console.log("\nGuess a number be 1 and 10");
        return Math.floor(Math.random() * 10 + 1);
    }
    else {
        console.log("\nGuess a number be 1 and 100");
        return Math.floor(Math.random() * 100 + 1);
    }
}
async function gameStart(level) {
    let number_to_guess;
    let chances;
    if (level.toLowerCase() === 'normal') {
        chances = 5;
        number_to_guess = randomNumberGenerator(level);
    }
    else {
        chances = 10;
        number_to_guess = randomNumberGenerator(level);
    }
    while (chances) {
        chances -= 1;
        let answer = await inquirer.prompt([
            {
                name: "guess",
                type: "number",
                message: "Guess a number: "
            }
        ]);
        if (answer.guess === number_to_guess) {
            return ({
                answer: number_to_guess,
                life: chances
            });
        }
        else if (answer.guess > number_to_guess) {
            console.log(chalk.yellow("HINT:") + `Guess number less than ${answer.guess}.`);
        }
        else {
            console.log(chalk.yellow("HINT:") + `Guess number greater than ${answer.guess}.`);
        }
    }
    console.log(chalk.white("Game Over"));
    console.log(chalk.blueBright("You failed to guess the right answer:\n"));
    return ({
        answer: -1,
        life: -1
    });
}
async function powerOn() {
    let gameChoice;
    do {
        let choice = await inquirer.prompt([
            {
                name: "level",
                type: "list",
                message: "Select the game level:",
                choices: ["Normal", "Hard"]
            }
        ]);
        let result = await gameStart(choice.level);
        if (result.answer != -1) {
            // const sleep=()=>{
            //     return new Promise((res)=>{
            //         setTimeout(res ,2000)
            // })
            console.log(chalk.bgRed(`You win:\bBy guessing ${result.answer} with ${result.life} left:`));
        }
        gameChoice = await inquirer.prompt([
            {
                name: "newGame",
                type: "list",
                message: "Would you like to play again",
                choices: ["No", "Yes"]
            }
        ]);
    } while (gameChoice.newGame.toLowerCase() === "yes");
}
powerOn();
