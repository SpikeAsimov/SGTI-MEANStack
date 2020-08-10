const Form = require('../models/form.model');

const formCtrl = {}

formCtrl.getAllForm = async (req, res) =>{
    const form = await Form.find();
    res.json(form);
}

formCtrl.createForm = async (req, res) =>{
   const form = new Form(req.body);
   await form.save();
   res.json({ 'status': 'Informacion enviada con exito'}); 
}

formCtrl.getForm = async (req, res) =>{
    const form = await Form.findById(req.params.id);
    res.json(form);
}

formCtrl.editForm = async (req, res) =>{
    const { id } = req.params;
    const form = {
        apellido: req.body.apellido,
        nombre: req.body.nombre,
        apeCony: req.body.apeCony,
        nombCony: req.body.nombCony,
        nacionalidad: req.body.nacionalidad,
        estCivil: req.body.estCivil,
        ldni: req.body.ldni,
        cin: req.body.cin,
        policia: req.body.policia,
        pasaporte: req.body.pasaporte,
        fechNac: req.body.fechNac,
        nombSociedad: req.body.nombSociedad,
        domSociedad: req.body.domSociedad,
        irpc: req.body.irpc,
        asoCiv: req.body.asoCiv,
        solicitante: req.body.solicitante,
        domicilio: req.body.domicilio,
        telefono: req.body.telefono
    }
    await Form.findByIdAndUpdate(id, { $set: form }, { new: true});
          res.json(form);
        //res.json({'status': 'Informacion actualizada'});
    
}

formCtrl.deleteForm = async (req, res) =>{
    await Form.findByIdAndRemove(req.params.id);
    res.json({'status': 'Informacion eliminada correctamente'});
}

module.exports = formCtrl;