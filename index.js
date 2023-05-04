const express = require('express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const { unless } = require("express-unless")

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    ()=>{
        console.log('Database is Connected...')
    },
    (error) => {
        console.log('Database is not connected: ' + error);
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            {url: '/users/login', methods: ['POST']},
            {url: '/users/register', methods: ['POST']},
            // {url: '/users/getallemp', methods: ['GET']},
            // {url: '/users/getemp/:id', methods: ['GET']},

        ],
    })
);

app.use(express.json());

app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHandler);

const server = app.listen(process.env.port || 4000, function(){
    console.log("server listening on port 4000");
    setTimeout(function(){
        console.log("server is running at http://127.0.0.1:4000/");
    }, 1000);
});

module.exports=app;

