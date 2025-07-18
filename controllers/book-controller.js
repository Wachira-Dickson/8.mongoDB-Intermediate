const { get } = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');


const createAuthor = async(req, res) => {
    try{
        const author = new Author(req.body);
        await author.save();

        res.status(201).json({
            success: true,
            message: "Author created successfully",
            data: author,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to create author",
            error: error.message
        });
    }   
}

const createBook = async(req, res) => {
    try{
        const book = new Book(req.body);
        await book.save();

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }catch(error){
        res.status(500).json({ 
            success: false,
            message: "Failed to create book",
            error: error.message
        });
    }   
}

const getBooksByAuthor = async(req, res) => {
    try{

        const book = await Book.findById(req.params.id).populate('author');

        if(!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }   
        res.status(200).json({
            success: true,
            message: "Books by author fetched successfully",
            data: book
        });

    }catch(error){
        console.error("Error fetching books by author:", error);
         // Return a 500 status code with an error message
        res.status(500).json({
            success: false, 
            message: "Failed to fetch books by author",
            error: error.message
        });
    }
}

module.exports = { createAuthor, createBook, getBooksByAuthor };