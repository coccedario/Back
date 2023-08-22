var express = require('express');
var router = express.Router();
var Novedadesmodel = require('../../models/NovedadesModel');
const names = require('../../routes/names.json');
/* GET home page. */

// Mostrar Registros Novedades

router.get('/', async function (req, res, next) {
 
  novedades= await Novedadesmodel.traenovedades();
 
 // res.json(novedades);
 // console.log(novedades)

   res.render('admin/novedades', {
          layout: 'admin/layout',
          persona: req.session.nombre,
          novedades

 }
 );  //render
});


// Agregar Registro Novedades

router.get('/agregar', async function (req, res, next) {
 
  

  res.render('admin/agregar', {
         layout: 'admin/layout',
         
  });
});

router.post('/agregar', async function (req, res, next) {
 
  try{

    if( req.body.titulo != "" && req.body.titulo != "" && req.body.cuerpo != ""){
await Novedadesmodel.Insertarnovedad(req.body);
res.redirect('/admin/novedades')

    }else{
res.render('admin/agregar',{
layout: 'admin/layout',
error: true,
mesage: 'Todos los campos son necesarios'

})
}

  }catch (error){

    console.log(error)
    res.render('admin/agregar',{
      layout: 'admin/layout',
      error: true,
      mesage: 'Todos los campos son necesarios'
      
      })

  }
  
});


///  // Eliminar Registro Noedades

router.get('/eliminar/:id', async function (req, res, next) {

  const id = req. params.id;
  await Novedadesmodel.eliminarnovedad(id);

  res. redirect('/admin/novedades')
         
  });

  // Modificar Registro Novedades

  router.get('/modificar/:id', async function (req, res, next) {
 var id = req.params.id;
  var novedades = await Novedadesmodel.traenovedad(id);
   console.log(novedades);
   console.log(id);
   // res.json(novedades);
   // console.log(novedades)
  
     res.render('admin/modificar', {
            layout: 'admin/layout',
            novedades
  
   }) //render
  });


  router.post('/modificar', async function (req, res, next) {
 
    try{
  
      var obj = {
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        cuerpo: req.body.cuerpo,
      }

      var id = req.body.id;
     
      await Novedadesmodel.modificarnovedad(obj, id);

      res.redirect('/admin/novedades');
  
  
    }catch (error){
  
      console.log(error)
      res.render('admin/modificar',{
        layout: 'admin/layout',
        error: true,
        mesage: 'No se pudo Modificar dato'
        
        })
  
    }
    
  });

module.exports = router;