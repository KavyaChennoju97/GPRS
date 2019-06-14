var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BooksSchema = new Schema({
    id:{
        type: String, 
    },
    title: {
        type: String, 
    },
    content: {
        type: String,    }
});

const Books=mongoose.model("Books",BooksSchema)
module.exports = {Books};
