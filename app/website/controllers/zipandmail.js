var fs = require("fs");
var JSZip = require("jszip");
var zip = new JSZip();

var ZipandMailView = require('../views/reference'),
    ZipandMailModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


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
    var correo = req.body.correo;
    nombreArchivos = req.body.archivos; 

    nombreArchivos.forEach(function (file, i) {
    create_zip(ruta + file.nombreRecibo + extension,file.nombreRecibo + extension);
    });
     

    function create_zip(file,name) {

    var contentPromise = new JSZip.external.Promise(function(resolve, reject) {
        fs.readFile(file, function(err, data) {
            if (err) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    });
    zip.file(name, contentPromise);
}

zip
    .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
    .pipe(fs.createWriteStream(ruta + carpeta + '.zip'))
    .on('finish', function() {
        // JSZip generates a readable stream with a "end" event,
        // but is piped here in a writable stream which emits a "finish" event.
        console.log(ruta + carpeta + '.zip' + "written.");
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
        to: correo, // list of receivers 
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
    console.log(object.result)           
}

module.exports = ZipandMail;
