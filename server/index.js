const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter');
const quesRoutes = require('./routes/questionRouter');
const cookieParser = require('cookie-parser');
dotenv.config('');
require('./config/dbConnect')

const PORT = process.env.PORT || 3000;

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/ques', quesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})