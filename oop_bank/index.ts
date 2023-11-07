import inquirer from 'inquirer';

class ModifiedBankAccount {
    private balance: number;
    private accountNumber: number;

    constructor() {
        this.balance = 500;
        this.accountNumber = Math.floor(Math.random() * 90000) + 10000;
    }

    async withdraw() {
        const { withdrawalAmount } = await inquirer.prompt({
            type: 'input',
            name: 'withdrawalAmount',
            message: 'Enter the amount to Withdraw: ',
            validate: function(value: any) {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        });

        if (withdrawalAmount <= this.balance) {
            this.balance -= withdrawalAmount + 1; // $1 for the transaction
            console.log(`Withdrawn ${withdrawalAmount} from your account. Remaining balance is ${this.balance} after deduction of $1 Transaction Fee`);
        } else {
            console.log('Insufficient balance.');
        }
    }

    async deposit() {
        const { depositAmount } = await inquirer.prompt({
            type: 'input',
            name: 'depositAmount',
            message: 'Enter the amount to Deposit: ',
            validate: function(value: any) {
                const valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number';
            },
            filter: Number,
        });
        if (depositAmount <= this.balance) {
            this.balance += depositAmount - 1; // $1 for the transaction
            console.log(`Deposited ${depositAmount} to your account. Remaining balance is ${this.balance}, $1 transaction fee deducted.`);
        }
    }
}

class ModifiedCustomer extends ModifiedBankAccount {
    private firstName: string;
    private lastName: string;
    private gender: string;
    private age: number;
    private mobileNumber: string;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: string) {
        super();
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
    }
}

async function createCustomerAndAccount() {
    const {
        customerFirstName,
        customerLastName,
        customerGender,
        customerAge,
        customerMobileNumber,
    } = await inquirer.prompt([
        { type: 'input', name: 'customerFirstName', message: 'Enter your first name:' },
        { type: 'input', name: 'customerLastName', message: 'Enter your last name:' },
        { type: 'list', name: 'customerGender', message: 'Select your gender:', choices: ['Male', 'Female'] },
        { type: 'input', name: 'customerAge', message: 'Enter your age:', filter: Number },
        { type: 'input', name: 'customerMobileNumber', message: 'Enter your mobile number:' },
    ]);

    const customer = new ModifiedCustomer(customerFirstName, customerLastName, customerGender, customerAge, customerMobileNumber);

    const { operation } = await inquirer.prompt({
        type: 'list',
        name: 'operation',
        message: 'Choose an operation:',
        choices: ['Withdraw', 'Deposit'],
    });

    if (operation === 'Withdraw') {
        customer.withdraw();
    } else {
        customer.deposit();
    }
}

createCustomerAndAccount();