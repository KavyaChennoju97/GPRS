const grpc = require('grpc')
var protoLoader = require("@grpc/proto-loader");
const BOOK_PROTO_FILE_PATH = './protos/books.proto'
const booksProto = grpc.loadPackageDefinition(
    protoLoader.loadSync(BOOK_PROTO_FILE_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    })
  );

const client = new booksProto.BookService('localhost:50051',
    grpc.credentials.createInsecure())
module.exports = client