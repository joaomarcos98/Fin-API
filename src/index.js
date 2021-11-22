const { request } = require('express');
const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json())

const customers = [];

function verifyExistsAccountCPF(req, res, next) {
    const { cpf } = req.headers;

    const customer = customers.find(customer => customer.cpf === cpf);

    if (!customer) {
        return res.status(404).json({ error: "Customer not found." })
    }

    req.customer = customer

    return next()
}

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === "credit") {
            return acc + operation.amount
        }
        return acc - operation.amount
    }, 0);
    return balance
};

app.post("/account", (req, res) => {
    const { cpf, name } = req.body;

    const customersAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf);


    if (customersAlreadyExists) {
        return res.status(400).json({ error: "Customer already exists!" })
    }

    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    });

    return res.status(201).json({ message: "Customer created successfully" })
});

app.get("/statement", verifyExistsAccountCPF, (req, res) => {
    const { customer } = req;
    return res.json(customer.statement);
});

app.post("/deposit", verifyExistsAccountCPF, (req, res) => {
    const { description, amount } = req.body;
    const { customer } = req;

    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    };

    customer.statement.push(statementOperation);

    return res.status(201).json({ message: "Deposit done successfully" })
});

app.post("/withdraw", verifyExistsAccountCPF, (req, res) => {
    const { amount } = req.body;
    const { customer } = req;
    const balance = getBalance(customer.statement);

    if (balance < amount) {
        return res.status(400).json({error: "Insufficient funds"})
    }

    const statementOperation = {
        amount,
        created_at: new Date(),
        type: "debit"
    };

    customer.statement.push(statementOperation);

    return res.status(201).json({message: "Withdraw successfully"})
});

app.listen(3000, (req, res) => {
    console.log("Server started in port 3000!")
});