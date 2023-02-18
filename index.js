import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paperModel from './model/paperModel.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;
// Middleware
app.use(express.json());

// Mongodb Connection
mongoose.connect(URL, () => {
    console.log('Connected To Db');
});

// Routes
app.get('/', async (req, res) => {
    try {
        const paperDoc = await paperModel.find();
        res.status(201).json({ paperDoc });
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
});
app.post('/paper', async (req, res) => {
    try {
        const { name, pdf, img, category } = req.body;
        const paperDoc = await paperModel.create({
            name,
            pdf,
            img,
            category,
        });
        paperDoc.save();
        res.status(201).json({ paperDoc });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

// Server
app.listen(PORT, (err) => {
    try {
        console.log(`Connected to ${PORT}`);
    } catch (error) {
        console.log(error);
    }
});
