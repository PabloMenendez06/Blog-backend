'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import categoryRoutes from '../src/category/category.routes.js';
import commentRoutes from '../src/comment/comment.routes.js';
import publicationRoutes from '../src/publications/publication.routes.js';

const applyMiddlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
};

const setupRoutes = (app) => {
    app.use('/blog/v1/category', categoryRoutes);
    app.use('/blog/v1/comment', commentRoutes);
    app.use('/blog/v1/publication', publicationRoutes);
};

const connectToDB = async () => {
    try {
        await dbConnection();
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error("Error connecting to the database", error);
        process.exit(1);
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        applyMiddlewares(app);
        connectToDB();
        setupRoutes(app);
        app.listen(port);
        console.log(`Server running on port: ${port}`);
    } catch (err) {
        console.log(`Server initialization failed: ${err}`);
    }
};
