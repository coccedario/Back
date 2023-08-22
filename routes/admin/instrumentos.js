var express = require('express');
var router = express.Router();
var InstrumentosModel = require('../../models/InstrumentosModel');
var RubrosModel = require('../../models/RubrosModel');
var MarcasModel = require('../../models/MarcasModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


const names = require('../names.json');
/* GET home page. */

// Mostrar Registros Instrumentos

router.get('/', async function (req, res, next) {

  datos = await InstrumentosModel.traedatos();
  var rubros = await RubrosModel.traedatos();

  

  datos = datos.map(dato => {

    if (dato.img) {

      const imagen = cloudinary.image(dato.img, {
        width: 70,
        heigth: 70,
        crop: 'fill'

      });
      // console.log(imagen)
      // console.log(dato.img)

      return {
        ...dato,
        imagen
      }
    } else {
      return {
        ...dato,
        imagen: ''

      }
    }
  });



  res.render('admin/instrumentos', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    datos,rubros

  }
  );  //render
});


// traer datos rubros

router.post('/rubros', async function (req, res, next) {

  const id = req.body.rubro;
  
   var rubros = await RubrosModel.traedatos();

  datos = await InstrumentosModel.traedatosrubro(id);


  datos = datos.map(dato => {

    if (dato.img) {

      const imagen = cloudinary.image(dato.img, {
        width: 70,
        heigth: 70,
        crop: 'fill'

      });
      // console.log(imagen)
      // console.log(dato.img)

      return {
        ...dato,
        imagen
      }
    } else {
      return {
        ...dato,
        imagen: ''

      }
    }
  });



  res.render('admin/instrumentos', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    datos,rubros

  }
  );  //render
});

// Agregar Registro Instrumento

router.get('/agregar', async function (req, res, next) {

  var rubros = await RubrosModel.traedatos();

  var marcas = await MarcasModel.traedatos();

  res.render('admin/agregarinstrum', {
    layout: 'admin/layout',
    rubros, marcas


  });
});

router.post('/agregar', async function (req, res, next) {

  try {

    var img = '';
    if (req.files && Object.keys(req.files).length > 0) {

      imagen = req.files.img;
      img = (await uploader(imagen.tempFilePath)).public_id;
    }

    if (req.body.titulo != "" && req.body.texto != "" && req.body.precio != "") {
      await InstrumentosModel.Insertardato({
        ...req.body,
        img

      });
      res.redirect('/admin/instrumentos')

    } else {
      res.render('admin/agregarinstrum', {
        layout: 'admin/layout',
        error: true,
        mesage: 'Todos los campos son necesarios'

      })
    }

  } catch (error) {

    console.log(error)
    res.render('admin/agregarinstrum', {
      layout: 'admin/layout',
      error: true,
      mesage: 'Todos los campos son necesarios'

    })

  }

});






///  // Eliminar Registro Instrumento

router.get('/eliminar/:id', async function (req, res, next) {


  const id = req.params.id;

  let instrumento = await InstrumentosModel.traedato(id);

  if (instrumento.img) {

    await (destroy(instrumento.img));

  }

  await InstrumentosModel.eliminardato(id);

  res.redirect('/admin/instrumentos')

});






// Modificar Registro Instrumento

router.get('/modificar/:id', async function (req, res, next) {
  var id = req.params.id;

  var dato = await InstrumentosModel.traedato(id);
  var rubros = await RubrosModel.traedatos();
  var rubro = await RubrosModel.traedato(dato.rubro);
  var marcas = await MarcasModel.traedatos();
  var marca = await MarcasModel.traedato(dato.marca);

  console.log(dato.marca)

  console.log(marca)

  // res.json(novedades);
  // console.log(novedades)

  res.render('admin/modificarinstrum', {
    layout: 'admin/layout',
    dato, rubros, rubro, marcas, marca

  }) //render
});


router.post('/modificar', async function (req, res, next) {


  try {

    let img = req.body.img_orig;
    let del_img_old = false;

    if (req.body.img_del === "1") {
      img = null;
      del_img_old = true;

    } else {

      if (req.files && Object.keys(req.files).length > 0) {

        imagen = req.files.img;
        img = (await uploader(imagen.tempFilePath)).public_id;
        del_img_old = true;
      }

    }

    if (del_img_old && req.body.img_orig) {

      await (destroy(req.body.img_orig));

    }


    var obj = {
      titulo: req.body.titulo,
      texto: req.body.texto,
      precio: req.body.precio,
      rubro: req.body.rubro,
      marca: req.body.marca,
      img

    }

    var id = req.body.id;

    await InstrumentosModel.modificardato(obj, id);

    res.redirect('/admin/instrumentos');


  } catch (error) {

    console.log(error)
    res.render('admin/modificarinstrum', {
      layout: 'admin/layout',
      error: true,
      mesage: 'No se pudo Modificar dato'

    })

  }

});

module.exports = router;