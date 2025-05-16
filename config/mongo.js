'use strict';

import mongoose from "mongoose";
import Category from "../src/category/category.model.js"; 

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('Could not connect to MongoDB');
            mongoose.disconnect();
        });

        mongoose.connection.on('connecting', () => {
            console.log('Attempting to connect to MongoDB...');
        });

        mongoose.connection.on('connected', async () => {
            console.log('Successfully connected to MongoDB');

            try {
                const defaultCategory = await Category.findOne({ name: "default" });
                if (!defaultCategory) {
                    await Category.create({ name: "default" });
                    console.log("Category 'default' created");
                } else {
                    console.log("Category 'default' already exists");
                }
            } catch (error) {
                console.error("Error checking/creating 'default' category:", error);
            }

            try {
                const tallerCategory = await Category.findOne({ name: "Taller" });
                if (!tallerCategory) {
                    await Category.create({ name: "Taller" });
                    console.log("Category 'Taller' created");
                } else {
                    console.log("Category 'Taller' already exists");
                }
            } catch (error) {
                console.error("Error checking/creating 'Taller' category:", error);
            }

            try {
                const tecnologiaCategory = await Category.findOne({ name: "Tecnologia" });
                if (!tecnologiaCategory) {
                    await Category.create({ name: "Tecnologia" });
                    console.log("Category 'Tecnologia' created");
                } else {
                    console.log("Category 'Tecnologia' already exists");
                }
            } catch (error) {
                console.error("Error checking/creating 'Tecnologia' category:", error);
            }

            try {
                const practicaSupervisada = await Category.findOne({ name: "PracticaSupervisada" });
                if (!practicaSupervisada) {
                    await Category.create({ name: "PracticaSupervisada" });
                    console.log("Category 'PracticaSupervisada' created");
                } else {
                    console.log("Category 'PracticaSupervisada' already exists");
                }
            } catch (error) {
                console.error("Error checking/creating 'PracticaSupervisada' category:", error);
            }
        });

        mongoose.connection.on('open', () => {
            console.log('Database connection is open');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('Reconnected to MongoDB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Disconnected from MongoDB');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

    } catch (error) {
        console.log('Database connection failed:', error);
    }
};
