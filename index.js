
const express = require('express');
const err = require('./middleware/404')
const usersRouter = require('./routes/users')
const booksRouter = require('./routes/books')
const mainRouter = require('./routes/index')
const mongoose = require('mongoose')


const app = express();

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.use('/', mainRouter)
app.use('/api/user', usersRouter)
app.use('/api/books', booksRouter)
app.use(err)

const UrlDB = process.env.UrlDB
async function start(PORT, UrlDB) {
    try {
        await mongoose.connect('mongodb://root:example@mongo:27017/');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

const PORT = process.env.PORT
start(PORT, UrlDB)