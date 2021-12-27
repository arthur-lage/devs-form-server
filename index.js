const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

require("dotenv").config()

const routes = require("./routes.js")

const app = express()

const PORT = process.env.PORT || 3001

const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ilivp.mongodb.net/dev-form?retryWrites=true&w=majority`

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(routes)

mongoose.connect(dbUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

app.listen(PORT, () => console.log("Running in port " + PORT))