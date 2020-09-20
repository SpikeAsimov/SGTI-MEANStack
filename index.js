const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

const { mongoose } = require('./database');

//Settings the port
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors({origin: 'http://localhost:4200'})); //Trabajando con el server 4200
app.use(cors({origin: 'https://total-tooling-272001.web.app'})); //Trabajando con el server 4200 

//Routes
app.use('/api', require('./routes/auth.route'));
app.use('/api/areas',require('./routes/areas.route'));
app.use('/api/user',require('./routes/user.route'));
app.use('/api/admin', require('./routes/admin.route'));
app.use('/api/forms',require('./routes/form.route'));
app.use('/api/forms/dataTramites', require('./routes/dataTramites.route'));
app.use('/api/historialTramite',require('./routes/historialTramite.route'));
app.use('/api/tipoTramites',require('./routes/tipoTramites.route'));
app.use('/api/img', require('./routes/imagenes.route'));
app.use('/api/upload', require('./routes/upload.route'));
app.use('/api/mercadoPago', require('./routes/mercadoPago'));
app.use('/api/sincronizacionPago', require('./routes/sincronizacionPago.route'));

//Starting the server
app.listen(app.get('port'),() => {
    console.log('Server on port', app.get('port'));
});
