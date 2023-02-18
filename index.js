import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import paperModel from './model/paperModel.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.URL;

app.use(express.json());
app.use(cors());
mongoose.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('Connected to database');
    }
);

app.get('/papers', async (req, res) => {
    try {
        const paperDoc = await paperModel.find();
        res.status(200).json({ paperDoc });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
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
        res.status(201).json({ paperDoc });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Bad request' });
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
