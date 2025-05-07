const Book = require('../models/Book')

exports.getAllBooks = async (req, res, next) => {
    try{
        const books = await Book.findAll()
        res.json(books)
    }
    catch(e){
        next(e)
    }
}

exports.getBookById = async(req, res, next) => {
    try{
        const book = await Book.findByPk(req.params.id)
        if(!book) return res.status(404).json({message: 'Book not Found'})
        res.json(book)
    }
    catch(e){
        next(e)
    }
}

exports.createBook = async(req, res, next) => {
    try{
        const book = await Book.create(req.body)
        res.status(201).json(book)
    }
    catch(e){
        next(e)
    }
}

exports.updateBook = async(req, res, next) => {
    try{
        const [updated] = await Book.update(req.body, { where: {id: req.params.id}})
        if(!updated) return res.status(404).json({message: 'Book not Found'})
            const updatedBook = await Book.findByPk(req.params.id)
            res.status(200).json(updatedBook)
    }
    catch(e){
        next(e)
    }
}

exports.deleteBook = async(req, res, next) => {
    try{
        const deleted = await Book.destroy({ where: {id: req.params.id}})
        if(!deleted) return res.status(404).json({message: 'Book not Found'})
            res.status(204).send()
    }
    catch(e){
        next(e)
    }
}