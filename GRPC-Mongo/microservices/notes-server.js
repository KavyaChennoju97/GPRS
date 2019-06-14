const grpc = require('grpc')
const uuidv1 = require('uuid/v1')
const BOOK_PROTO_FILE_PATH = './protos/books.proto'
const booksProto = grpc.load({root: __dirname, file: BOOK_PROTO_FILE_PATH})
var {Books} = require('./models/books');

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://user:user@cluster0-yhk3o.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true}, function (err) {
    if (err) {
        console.log("ERROR! MONGO MONGOOSE")
        throw err;
    }
    else {
        console.log('Successfully connected to MongoDB');
    }
})
const server = new grpc.Server()
server.addService(booksProto.BookService.service, {
    list: (_, callback) => {
        
        //make request
        Books.find({ },function(err,res){
                if(err)
                {
                     console.log("error is",err)
                }
                else{
                    callback(null, JSON.stringify(res))
                    console.log(JSON.stringify(res));
                }
            })
        

    },
    insert: (call, callback) => {
        let book = call.request
        book.id = uuidv1()
        console.log("title is"+book.title+"    content is"+book.content)
       
        Books.create({id:book.id,
        title:book.title,
        content:book.content
        },function(err,res){
            if(err)
            {
                 console.log("error is",err)
            }
            else{
                console.log("book created")
            }
        })
        callback(null, book)
    }
})
server.bind('127.0.0.1:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://127.0.0.1:50051')
server.start()