var ZipandMailView = require('../views/reference'),
    ZipandMailModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');

var EasyZip = require('easy-zip').EasyZip;


var ZipandMail = function(conf) {
    this.conf = conf || {};

    this.view = new ZipandMailView();
    this.model = new ZipandMailModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }
}

ZipandMail.prototype.post_generaZipMail = function(req, res, next) {  //Objeto que almacena la respuesta
      
    var object = {};   //Objeto que envía los parámetros
    var params = [];   //Referencia a la clase para callback
    var self = this;
    var nombreArchivos = [];
    var files = [];
    var ruta = req.body.path;
    var extension = '.pdf';
    var carpeta = req.body.nombreCarpeta;
    nombreArchivos = req.body.archivos; 

    nombreArchivos.forEach(function (file, i) {
    files.push({source:ruta + file.nombreRecibo + extension, target: file.nombreRecibo + extension});
    });
     
   
    var zip = new EasyZip();
    zip.batchAdd(files, function() {
        zip.writeToFile( ruta + carpeta + '.zip');
    });

    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'falvaradoluna@gmail.com',
            pass: 'Abcd1234-'
        }
    });

    var mailOptions = {
        from: '"Fernando Alvarado Luna" <falvaradoluna@gmail.com>', // sender address 
        to: 'falvarado@bism.com.mx', // list of receivers 
        subject: 'Recibos Timbrados', // Subject line 
        text: 'Se envían adjuntos los archivos timbrados ', // plaintext body 
        html: '<b>Se envían adjuntos los archivos timbrados </b>', // html body 
        attachments: [{ // file on disk as an attachment
            filename:  + carpeta + '.zip',
            path: ruta + carpeta + '.zip' // stream this file
        }]
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });


    object.error = null;            
    object.result = 1;            
}





module.exports = ZipandMail;
