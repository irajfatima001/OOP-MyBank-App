#!/usr/bin/env node
import inquirer from "inquirer"


interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount: number): void
    chechBalance(): void
}

class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber
        this.balance = balance

    }
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount
            console.log(`Withdrawl of $${amount} successful.Remaining balance: $${this.balance}`);

        } else {
            console.log('Insufficient Balance!');


        }
    }
    deposit(amount: number): void {
        if (amount > 100) {
            amount -= 1;

        } this.balance += amount
        console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`);

    }

    chechBalance(): void {
        console.log(`Current balance: $${this.balance}`);


    }
}
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }

}

const accounts: BankAccount[] = [
    new BankAccount(2001, 5000),
    new BankAccount(3001, 10000),
    new BankAccount(4001, 20000)
];

const customers: Customer[] = [
    new Customer("Ali", "Zaidi", "Male", 35, 3333444488, accounts[0]),
    new Customer("Hira", "Khan", "Female", 28, 3157765977, accounts[1]),
    new Customer("Fatima", "Malik", "Female", 26, 3444467846, accounts[2])
]

async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your account number:"

        })

        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if (customer) {
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit", "withdraw", "Check Balance", "Exit"]

            }]);


            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to deposit:"

                    })
                    customer.account.deposit(depositAmount.amount)
                    break;
                case "withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to withdraw:"

                    })
                    customer.account.withdraw(withdrawAmount.amount)
                    break;
                case "Check Balance":

                    customer.account.chechBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program..");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    return;
            }
        } else {
            console.log("Invalid account number. Please try again.");

        }

    } while (true)
}

service()


