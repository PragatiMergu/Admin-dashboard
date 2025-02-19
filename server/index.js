import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
console.log(process.env.PORT);
app.use(bodyParser.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST","PATCH","DELETE"]
}));

app.use(express.json());
app.use('/auth', authRouter); 
app.get('/', (req, res) => {
    console.log("req.body");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});
