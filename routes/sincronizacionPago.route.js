const express = require('express');
const app = express();
const sincronizacionPagos = require('../models/sincronizacionPagos');

app.post('/add', async (req, res) => {
    const newProcess = new sincronizacionPagos(req.body);
    await newProcess.save()
    return res.status(200).json({
        data: newProcess
    })
});

app.get('/all/procesos', async (req, res) =>{
    const allProcess = await sincronizacionPagos.find()
                                                .populate('usuario')
                                                .limit(1)
                                                .sort({_id:-1});
    return res.status(200).json({
        data: allProcess
    });
});

module.exports = app;