const express = require('express');
const session=require('express-session');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();

const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');


app.use(bodyParser.json());

const checkForSession = require('./middlewares/checkForSession');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(checkForSession);               //why we are not useing req,res,next as parameter as the mini project? what are the differences?
app.use( express.static( `${__dirname}/build` ) );


app.get("/api/swag", swag_controller.read);

app.post("/api/login", auth_controller.login);
app.post("/api/register", auth_controller.register);
app.post("/api/signout", auth_controller.signout);
app.get("/api/user", auth_controller.getUser);

app.post("/api/cart",cart_controller.add);
app.delete("/api/cart",cart_controller.delete);
app.post("/api/cart/checkout",cart_controller.checkout);

app.get("/api/search",search_controller.search);

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );