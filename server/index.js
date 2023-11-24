const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRouter');
dotenv.config('');
require('./config/dbConnect')

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})