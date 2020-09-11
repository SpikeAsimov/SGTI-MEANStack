const dataTramite = require('../models/dataTramite');
const { countDocuments } = require('../models/dataTramite');
const { count } = require('console');


const dataCtrl = {};

dataCtrl.getAllData = async (req, res) => {
    const dataAll = await dataTramite.find()
        .populate('usuario', 'apellido nombre telefono')
        .populate('area', 'nombre')
        .populate('producto', 'formulario descripcion')
        .sort({_id:-1});
        

    if (!dataAll) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener listado de tramites'
        })
    }
    
    var cIni = 0;
    var cProc = 0;
    var cFina = 0;
    dataAll.forEach(e => {
        if(e.estadoTram == 'Iniciado'){
            cIni = cIni+1;
        }
        if(e.estadoTram == 'En proceso'){
            cProc = cProc+1;
        }
        if(e.estadoTram == 'Finalizado'){
            cFina = cFina+1;
        }        
    });

    return res.status(200).json({
        ok: true,
        allDataMinH: dataAll,
        iniciados: cIni,
        proceso: cProc,
        finalizados: cFina
    });
};

dataCtrl.getAllDataById = async (req, res) => {
    const _id = req.params.id;
    const dataAll = await dataTramite.find({'usuario': _id})
    .populate('usuario', 'apellido nombre telefono')
    .populate('area', 'nombre')
    .populate('producto', 'formulario descripcion')
    .populate('comprobantePago')
    .sort({_id:-1});
    if (!dataAll) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener listado de tramites'
        })
    }
    var cIni = 0;
    var cProc = 0;
    var cFina = 0;
    dataAll.forEach(e => {
        if(e.estadoTram == 'Iniciado'){
            cIni = cIni+1;
        }
        if(e.estadoTram == 'En proceso'){
            cProc = cProc+1;
        }
        if(e.estadoTram == 'Finalizado'){
            cFina = cFina+1;
        }
    });

    return res.status(200).json({
        ok: true,
        allDataMinH: dataAll,
        iniciados: cIni,
        proceso: cProc,
        finalizados: cFina
    });
};

dataCtrl.getData = async (req, res) => {
    const id = req.params.id;
    if(!id){
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener datos del tramite'
        })
    }
    const dataMinH = await dataTramite.findById(id)
            .populate('usuario', 'apellido nombre telefono')
            .populate('area', 'nombre')
            .populate('producto', 'formulario descripcion')
            .populate('comprobantePago')
    return res.status(200).json({
        ok: true,
        dataMinH: dataMinH
    })

};

dataCtrl.getAllMaxCodi = async (req, res) => {
    const dataAll = await dataTramite.find()
        .sort({codigo:-1})
        .limit(1);
        
    if (!dataAll) {
        return res.status(400).json({
            ok: false,
            message: 'Error al obtener registro maximo codigo'
        })
    }
    return res.status(200).json({
            ok: true,
        tramite: dataAll
    });
};

dataCtrl.createTram = async (req, res) => {
    const formData = new dataTramite(req.body);
    if(!formData){
        return res.status(400).json({
            ok: false,
            message: 'Error al grabar informacion'
        })
    }
    await formData.save();
    return res.status(200).json({
        ok: true,
        data: formData,
        message: 'Tramite cargado de forma correcta'
    })
};

dataCtrl.editData = async (req, res) => {
    const dataMinH = req.body;
    if (!dataMinH) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al obtener datos del tramite'
        });
    }
    await dataTramite.findByIdAndUpdate(req.params.id, { $set: dataMinH }, { new: true });
    return res.status(200).json({
        ok: true,
        minutaH: dataMinH,
        message: "Informacion actualizado correctamente"
    })

};

dataCtrl.deleteData = async (req, res) => {
    await dataTramite.findByIdAndRemove(req.params.id);
    return res.status(200).json({
        ok: true,
        message: 'Tramite eliminado'
    });
};

module.exports = dataCtrl
