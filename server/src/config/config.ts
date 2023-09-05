const config = {
    mongo:{
        options:{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            socketTimeoutMS:30000,
            keepAlive: true, 
            poolSize:50,
            autoIndex:false,
            retryWrites: false
        },
        url:`mongodb+srv://akashchikhalonde88088:guessit@cluster0.expag4k.mongodb.net/myDataBAse`
    },
    server :{
        host: 'localhost',
        port:1337
    }
}

export  default config