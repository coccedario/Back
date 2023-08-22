var express = require('express');
var router = express.Router();
var UsuariosModel = require('./../../models/UsuariosModel');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    title: 'LOGIN'
    , layout: 'admin/layout'
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.post('/', async (req, res, next) => {
  try {

    var usuario = req.body.usuario;
    var password = req.body.password;

    console.log(usuario);

    var data = await UsuariosModel.traeusuario(usuario, password);

    if (data != undefined) {

      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect('/admin/instrumentos');

    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }

  } catch (error) {
    console.log(error);
  }

});

module.exports = router;