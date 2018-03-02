const users = require('../models/users');
let id=1;               //only use let would work, and const is not working for some reason, may need to ask

module.exports = {
    login: (req,res,next)=>{
        const {username, password} = req.body;
        const user = users.find(user => username===user.username && password===user.password);

        if(user){
            req.session.user.username = user.username;
            res.status(200).send(req.session.user)
        }
        else {res.status(500).send('Not Authorized')};
        
    },

    register: (req,res,next)=>{
        const {username, password} = req.body;
        users.push({
                    id,
                    username,
                    password
        });
        id++;
        req.session.user.username = username;
        res.status(200).send(req.session.user)
        
    },
    
    signout: (req,res,next)=>{
        req.session.destroy();
        res.status(200).send(req.session)        
    },

    getUser: (req,res,next)=>{
        res.status(200).send(req.session.user)
    }

};