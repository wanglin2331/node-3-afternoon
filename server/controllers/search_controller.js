const swag = require('../models/swag');

module.exports={
    search: (req,res,next)=>{
        const {category} = req.query;
        const filterSwag = swag.filter(swag=>swag.category==category);
        if(category){
            res.status(200).send(filterSwag)
        }
        else {res.status(200).send(swag)}
    }
}