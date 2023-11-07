import inquirer from "inquirer";
import chalk from "chalk";

const logo = `
 ____  ____  _     _____ _      _____  _     ____  _____
/  _ \/  _ \/ \ |\/  __// \  /|/__ __\/ \ /\/  __\/  __/
| / \|| | \|| | //|  \  | |\ ||  / \  | | |||  \/||  \  
| |-||| |_/|| \// |  /_ | | \||  | |  | \_/||    /|  /_ 
\_/ \|\____/\__/  \____\\_/  \|  \_/  \____/\_/\_\\____\
                                                        
`;

class Player{
    teamName:string;
    teamMembers:number = 5;

    constructor (name:string)
    {
        this.teamName = name
    }

    playerDown()
    {
        this.teamMembers -= 1;
    }

    playerRevived()
    {
        this.teamMembers += 1;
    }
}

class Opponent{
    teamLevel:string;
    teamMembers:number;

    constructor (level:string, total:number)
    {
        this.teamLevel = level;
        this.teamMembers = total;
    }

    opponentDown()
    {
        this.teamMembers -= 1;
    }
    
}

console.log(chalk.bgRed.white("---------------------- Welcome to this Adventure Game ----------------------"))

console.log(chalk.whiteBright(logo));


let newPlayer = await inquirer.prompt([
    {
        name: "teamName",
        type: "input",
        message: "Enter your team name:"
    },
    {
        name: "level",
        type: "list",
        message: "Choose the level:",
        choices: ["Easy", "Medium", "Hard"]
    }
])

let p1 = new Player(newPlayer.teamName);

let total:number;

if(newPlayer.level == "Easy")
{
    total = 5;
}
else if(newPlayer.level == "Medium")
{
    total = 7;
}
else
{
    total = 10;
}

let o1 = new Opponent(newPlayer.level, total);

do{
    let action = await inquirer.prompt([
        {
            name: "letsGo",
            type: "list",
            message: "Select your team next move:",
            choices: ["OpenFire", "HealInjured", "Retreat"]
        }
    ]);

    if(action.letsGo == "OpenFire")
    {
        let num = Math.floor(Math.random() * 2);

        if(num > 0 )
        {
            p1.playerDown();

            console.log(chalk.bold.red("Your one player is down."));

            if(p1.teamMembers <= 0)
            {
                console.log(chalk.bold.whiteBright("Your lose"));
                process.exit()
            }
        }
        else
        {
            o1.opponentDown();
            console.log(chalk.bold.red("One opponent is down."));
            
            if(o1.teamMembers <= 0)
            {
                console.log(chalk.bold.whiteBright("Your Win !!!"));
                process.exit()
            }
        }
    }
    else if(action.letsGo == "HealInjured")
    {
        let num = Math.floor(Math.random() * 2);

        if (num > 0)
        {
            p1.playerRevived();
            console.log(chalk.bold.blue("Your one player is healed."));
        }
        else
        {
            console.log(chalk.bold.red("Your one player cannot survive unfortunately."));
        }
    }
    else
    {
        console.log(chalk.bold.whiteBright("Your lose"));
        process.exit()
    }

    
}while(true);
