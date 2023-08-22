var express = require('express');
var router = express.Router();
var InstrumentosModel = require('../models/InstrumentosModel');
const names = require('./names.json');
/* GET home page. */

// Mostrar Registros Instrumentos

router.get('/', async function (req, res, next) {
 
  datos= await InstrumentosModel.traedatos();
 
 res.json(datos);
 console.log(datos)

//    res.render('admin/instrumentos', {
//           layout: 'admin/layout',
//           persona: req.session.nombre,
//           datos

//  }
//  );  //render
});

module.exports = router;