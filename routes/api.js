var express = require('express');
var router = express.Router();
var InstrumentosModel = require('../models/InstrumentosModel');
var RubrosModel = require('../models/RubrosModel');
var MarcasModel = require('../models/MarcasModel');
const nodemon = require('nodemon');
var cloudinary = require('cloudinary').v2;
var nodemailer = require('nodemailer');

router.get('/rubros', async function (req, res, next) {

   datos = await RubrosModel.traedatos();
   

    res.json(datos);

});

router.get('/marcas', async function (req, res, next) {

    datos = await MarcasModel.traedatos();
    
 
     res.json(datos);
 
 });

router.get('/instrumentos', async function (req, res, next) {

    datos = await InstrumentosModel.traedatos();

    datos = datos.map(dato => {

        if (dato.img) {

            const imagen = cloudinary.url(dato.img, {
                width: 70,
                heigth: 70,
                crop: 'fill'

            });



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



    res.json(datos);

   

});  // fin get

router.get('/instrumentos/:id', async function (req, res, next) {


    const id = req.params.id;

    datos = await InstrumentosModel.traedatosinner();
   

    datos = datos.map(dato => {

        if (dato.img) {

            const imagen = cloudinary.url(dato.img, {
                
                crop: 'fill'

            });



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

   

    const datos1 = datos.filter((dat) => dat.rubro == id);

    console.log(datos1)

    res.json(datos1);

   

});  // fin get

////////// ENVIO DE MAILS

router.post('/contacto',async(req,res) => {

    const mail = {
    
        to: 'dcocce@gmail.com',
        subject: 'Contacto Web',
        html: `${req.body.nombre}  se contacto a traves del correo y desea recibir info a este correo ${req.body.email}
        <br> Dejo dicho ${req.body.mensaje}<br> su tel es ${req.body.telefono} `
    }
    console.log(req.body.nombre)

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
    
    
    
      }); // cierra transporte
    
      await transport.sendMail(mail)
    
      res.status(201).json({
    
    error: false,
    message: 'Mensaje Enviado'
    
      });
    
    });   // cierre post api 

    router.post('/compra',async(req,res) => {

        const mail = {
        
            to: 'dcocce@gmail.com',
            subject: 'Contacto Web',
            html: `Atencion departamento Ventas: ${req.body.nombre} direccion de envio ${req.body.calle} numero ${req.body.numero} <br> ha comprado el Articulo ${req.body.titulo} Marca ${req.body.marca} con codigo de Producto ${req.body.id} y espera correo para terminar transaccion <br> enviaremos un mail a  ${req.body.email}
            <br>con la confirmacion y opciones de pago <br> y lo contactaremos a su tel  ${req.body.telefono} `
        }
        console.log(req.body.nombre)
    
        var transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
        
        
        
          }); // cierra transporte
        
          await transport.sendMail(mail)
        
          res.status(201).json({
        
        error: false,
        message: 'Gracias por su compra, su articulo queda reservado, en breve lo contactamos para finalizar la compra'
        
          });
        
        });   // cierre post compra

module.exports = router;