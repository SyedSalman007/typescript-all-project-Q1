import inquirer from "inquirer";

class Individual {
    name:string;
    personality:string;

    constructor(theName:string, personalityType:number) 
    {
        this.name = theName;
        this.personality = 'Unknown';
        if (personalityType === 1) {
            this.personality = 'Extroverted';
        } else if (personalityType === 2) {
            this.personality = 'Introverted';
        }
    }

    describeIndividual() {
        console.log(`${this.name}, Your Personality is ${this.personality}`);
    }
}

async function createIndividual() {
    const { personName } = await inquirer.prompt({
        type: 'input',
        name: 'personName',
        message: 'Please enter your name: '
    });

    const { personType } = await inquirer.prompt({
        type: 'input',
        name: 'personType',
        message: 'Select your personality type (Enter 1 for Extroverted, 2 for Introverted, any other key for Unknown): ',
        filter: function (val) {
            return parseInt(val);
        }
    });

    const individual = new Individual(personName, personType);
    individual.describeIndividual();
}

createIndividual();