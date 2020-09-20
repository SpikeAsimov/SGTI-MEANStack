const express = require('express');
const app = express(); 
const mercadopago = require('mercadopago');
const { findByIdAndUpdate } = require('../models/comprobantePago');
const comprobantePago = require('../models/comprobantePago');

// Credenciales
mercadopago.configure({
    //access_token: 'TEST-1433329887629306-090100-528a994a37cc4810be8fc2a1a88fdd95-290597670'
    access_token: 'APP_USR-1433329887629306-090100-fab47c14d6a19fd4aa9ab2a5ef0fec7d-290597670'
});

app.get('/pagos/all', async (req, res) =>{
    const pagos = await comprobantePago.find({});
    return res.status(200).json({
        data: pagos
    });
});

app.get('/pagos/:id', async (req, res) =>{
    const pago = await comprobantePago.findById(req.params.id);
    return res.status(200).json({
        data: pago
    });
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

app.put('/update/estado/:id', async (req, res) =>{
     const dataMercadoPago = req.body;
     await comprobantePago.findByIdAndUpdate(req.params.id, {$set: dataMercadoPago}, {new: true});
     return res.status(200).json({
         newData: dataMercadoPago
     })
});

module.exports = app;