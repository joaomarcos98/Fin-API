const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json())

const customers = [];

app.listen(3000, (req, res) => {
    console.log("Server started in port 3000!")
});

app.post("/account", (req, res) => {
    const { cpf, name } = req.body;

    const customersAlreadyExists = customers.some(
        (customer) => customer.cpf === cpf);


    if (customersAlreadyExists) {
        return res.status(400).json({error: "Customer already exists!"})
    }

    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    });

    return res.status(201).send()
});