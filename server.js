require('dotenv').config();
const mongoose = require('mongoose')

const app = require("./app")
const { PORT } = require('./configs');


app.listen(PORT, () => {
    console.log(`server started listening on port ${PORT}...`)
})