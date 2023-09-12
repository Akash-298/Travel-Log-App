import http from 'http';
import express from 'express';
import logging from './config/logging';
import config from './config/config';
import mongoose from 'mongoose';
import firebaseAdmin from 'firebase-admin';

import userRoutes from './routes/user';
import blogRoutes from './routes/blog';

const router = express();


const httpServer = http.createServer(router);


let serviceAccount = require('./config/serviceAccountKey.json');

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});


mongoose
    .connect(config.mongo.url, config.mongo.options)
    .then((result) => {
        logging.info('Mongo Connected');
    })
    .catch((error) => {
        logging.error(error);
    });


router.use((req, res, next) => {
    logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        logging.info(`METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
    });

    next();
});


router.use(express.urlencoded({ extended: true }));
router.use(express.json());


router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);


router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});


httpServer.listen(config.server.port, () => logging.info(`Server is running ${config.server.host}:${config.server.port}`));