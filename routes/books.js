const express = require('express')
const router = express.Router();
const fileMulter = require('../middleware/file')
const {v4: uuid} = require('uuid');
const path = require('path');
const axios = require('axios');
const Book = require('../models/books')



router.get('/', async (req, res) => {
    try {
        const book = await Book.find().select('-__v')
        res.render("books/index", {
            title: "Все книги",
            books: book,
        });
        } catch (e) {
        res.status(500).json
    }
    });

router.get('/view/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await Book.findById(id).select('-__v')
        res.render("books/view", {
            title: "Книга | Просмотр",
            books: book
        })
    } catch (e) {
        res.status(500).json
    }
   
})


router.get('/create', (req, res) => {
    res.render("books/create", {
        title: "Книги | добавление",
        books: {},
    });
});

router.post('/create', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const newBook = new Book({title, description, authors, favorite, fileCover, fileName})
    try {
        await newBook.save()
        res.redirect(`/api/books`)
        } catch (e) {
            res.redirect(`/404`)
        }
})

router.get('/update/:id', async (req, res) => {
    const {id} = req.params
    try {
        const book = await Book.findById(id).select('-__v')
        res.render("books/update", {
            title: "Книги | обновление",
            books: book
        })
    } catch (e) {
        res.redirect('/404')
    }
    });

router.post('/update/:id', async (req, res) => {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    const {id} = req.params
    try {
        await Book.findByIdAndUpdate(id, {title, description, authors, favorite, fileCover, fileName})
        res.redirect(`/api/books/view/${id}`)
    } catch (e) {
        res.redirect(`/404`)
    }
})


router.post('/delete/:id',  async (req, res) => {
    const {id} = req.params
    try {
        await Book.deleteOne({_id: id})
        res.redirect(`/api/books/`)
    } catch (e) {
        res.redirect(`/404`)
    }
})

module.exports = router