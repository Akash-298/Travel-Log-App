const config = {
    mongo:{
        options:{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            socketTimeoutMS:30000,
            keepAlive: true, 
            maxPoolSize:50,
            autoIndex:false,
            retryWrites: false
        },
        url:`mongodb+srv://akashchikhalonde88088:doitnow@cluster0.expag4k.mongodb.net/?retryWrites=true&w=majority`,
    },
    server :{
        host: 'localhost',
        port:1337
    }
}
export default config
