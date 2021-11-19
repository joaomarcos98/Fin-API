const express = require('express');

const app = express()

app.listen(3000, (req,res)=> {
    console.log("Server started in port 3000!")
})