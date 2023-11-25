const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter');
const quesRoutes = require('./routes/questionRouter')
dotenv.config('');
require('./config/dbConnect')

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/ques', quesRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})