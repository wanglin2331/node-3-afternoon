const swag = require('../models/swag');

module.exports = {
    add: (req,res,next)=> {

        const index = req.session.user.cart.findIndex(swagSession => req.query.id===swagSession.id );
        
        if(index===-1){
            const selectedSwag = swag.find(swag => req.query.id==swag.id);
            req.session.user.cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }
            res.status(200).send(req.session.user)
    },

    delete: (req,res,next)=> {
        const selectedSwag = swag.find( swag => swag.id == req.query.id ); 

        if(selectedSwag){
            const index = req.session.user.cart.findIndex(swag => swag.id == req.query.id);
            req.session.user.cart.splice(index,1);
            req.session.user.cart.total -=  selectedSwag.price;
        }

        res.status(200).send(req.session.user);
    },

    checkout: (req,res,next)=> {
        req.session.user.cart=[];
        req.session.user.total=0;
        res.status(200).send(req.session.user);
    }

}