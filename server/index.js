const express = require('express');
const morgan = require('morgan');

const app = express();
const { mongoose } = require('./database');

//Settings the port
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json()); 

//Routes
app.use('/api/users',require('./routes/user.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/forms',require('./routes/form.route'));

//Starting the server
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});