const User = require('../models/user_model');
const Event = require('../models/event_model');
const LearningMaterial = require('../models/learningMaterial_model');
const Token = require('../models/token_model');
const FindUser = require('./IntergratedFunctions');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const SignIn = async (req, res) => {
    try{
        const data = req.body;

        let user = new User(data);

        const userId = await FindUser(data.username);
        if (userId) {
            return res.status(303).json({ 
                message: "User vec postoji. :(" 
            });
        }
        
        user = await user.save();
        
        console.log("Signed in successfully :D");

        const accessToken = await makeToken(user.id);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.status(201).json({
            accessToken: accessToken
        });
    }catch(error){
        res.status(500).json({
            message: "Nisam uspeo SignIn :(",
            error: error.message
        });
    }
};

const LogIn = async (req, res) => {
    try{
        const data = req.body;

        const userId = await FindUser(data.username);
        if (!userId) {
            return res.status(303).json({ 
                message: "Username ne postoji :(" 
            });
        }

        const currentUser = await User.findById(userId);

        if(currentUser.password != data.password){
            return res.status(303).json({ 
                message: "Password je pogresan :(" 
            });
        }

        console.log("Logged in successfully :D");
        
        const accessToken = await makeToken(currentUser.id);
        const refreshToken = jwt.sign(currentUser.id, procces.env.REFRESH_TOKEN_SECRET);

        if(accessToken == null){
            return res.status(501).json({
                message: "Couldn't make an access token :("
            });
        }

        res.status(201).json({
            accesToken: accessToken,
            refreshToken: refreshToken
        });
    } catch(error){
        res.status(500).json({
            message: "Nisam uspeo LogIn :(",
            error: error.message
        });
    }
};

const LogOut = async (req, res) => {

};

const RefreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token;
        if(refreshToken == null) { 
            return res.status(401).json({
                error: "No refresh token in request."
            });
        }
        
        refreshToken = await Token.findOne({token: refreshToken});

        if(refreshToken == null){
            return res.status(403).json({
                error: "Refresh token not found."
            }); 
        }

        jwt.verify(refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
            if(error){
                return res.status(403).json({
                    error: error
                });
            }
            const accessToken = makeToken(user.id);
            res.status(200).json({
                accessToken: accessToken
            });
        });
    } catch (error) {
        res.status(403).json({
            error: error
        })
    }
};

const authenticateToken = async (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error,user) => {
        if(error) return res.status(403);
        req.user = user;
        next();
    });
};

const makeToken = async (currentUser) => {
    try {
        console.log(currentUser);
        const accessToken = jwt.sign(currentUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
        return accessToken;
    } catch (error) {
        console.log("Error u pravljenju tokena: " + error);
        return null;
    }
};

module.exports = [SignIn, LogIn, LogOut, RefreshToken];