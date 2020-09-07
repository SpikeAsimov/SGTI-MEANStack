const express = require('express');
const app = express(); 
const mercadopago = require('mercadopago');
const comprobantePago = require('../models/comprobantePago');

// Credenciales
mercadopago.configure({
    access_token: 'TEST-1433329887629306-090100-528a994a37cc4810be8fc2a1a88fdd95-290597670'
});

app.post('/checkout', async (req, res) =>{
    const pref = req.body;
    await mercadopago.preferences.create(pref)
    .then(function(response){
        global.id = response.body.id;
        console.log(global.id);
        return res.json({
            data: response
        })
    }).catch(function(error){
        console.log(error);
    });
});

app.post('/payments', async (req, res) =>{
 const operacionPago = new comprobantePago(req.body);
 await operacionPago.save();
 return res.status(200).json({
    payments: operacionPago
    })
});

module.exports = app;