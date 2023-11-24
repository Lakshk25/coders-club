const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {success, failure} = require('../utils/responseWrapper');
const { validationResult } = require('express-validator');

const signupController = async (req, res) => {
    try{
        // to check if email is valid and password must be atleast 3 characters
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.send(failure(400, errors));
        }

        const { name, email, password } = req.body;
        if(!name || !email || !password){
            return res.send(failure(400, "All fields are required"));
        }

        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send(failure(409, "User with the provided email already exists."))
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        return res.send(success(201, user));
    }catch(error){
        console.log(error);
        return res.send(failure(401, {error}))
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.send(failure(400, "All fields are required"));
        }

        const user = await User.findOne({email});
        if(!user){
            return res.send(failure(404, "No user found with this email address"));
        }
        // decrypt DB password and match with entered password
        const matched = await bcrypt.compare(password, user.password);
        if(!matched){
            return res.send(failure(401, "Invalid password"));
        }

        //generate access token when logged in
        const accessToken = generateAccessToken({_id: user._id});

        return res.send(success(201, {accessToken}));
    } catch (error) {
        console.log(error);
        return res.send(failure(401, {error}));
    }
}

const generateAccessToken = (data) => {
    try{
        const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '1y',
        })
        return token;
    }catch(error){
        console.log('jwt error ', error);
    }
}

module.exports = {
    loginController,
    signupController
}