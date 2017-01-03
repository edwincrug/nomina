// var LoginView = require('../views/reference'),
//     LoginModel = require('../models/dataAccess'),
//     moment = require('moment');
// var phantom = require('phantom');
// var path = require('path');
// var webPage = require('webpage');
// var request = require('request');

 var EasyZip = require('easy-zip').EasyZip;


// var ZipandMail = function (conf) {
//     this.conf = conf || {};

//     this.view = new ZipandMailView();
//     this.model = new ZipandMailModel({
//         parameters: this.conf.parameters
//     });

//     this.response = function () {
//         this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
//     }
// }


// ZipandMail.prototype.post_generaZipMail = function (req, res, next) {  //Objeto que almacena la respuesta
//       
//     var object = {};   //Objeto que envía los parámetros
//     var params = [];   //Referencia a la clase para callback
//     var self = this;
//     var nombreArchivos = [];
//     nombreArchivos = req.body.archivos;  
//     nombreArchivos.forEach(function (file, i) {  


//     	  
        
//         }  
//     );


//     object.error = null;            
//     object.result = 1;            
//     self.view.expositor(res, object);

// }

var files = [
    {source : 'C:/Desarrollo/xml/2912201600101001110110030303441.pdf',target:'2912201600101001110110030303441.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030309431.pdf',target:'2912201600101001110110030309431.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030314151.pdf',target:'2912201600101001110110030314151.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030314301.pdf',target:'2912201600101001110110030314301.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030317541.pdf',target:'2912201600101001110110030317541.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030322181.pdf',target:'2912201600101001110110030322181.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030323051.pdf',target:'2912201600101001110110030323051.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030338531.pdf',target:'2912201600101001110110030338531.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030338551.pdf',target:'2912201600101001110110030338551.pdf'},
    {source : 'C:/Desarrollo/xml/2912201600101001110110030331601.pdf',target:'2912201600101001110110030331601.pdf'}
];

var zip = new EasyZip();
zip.batchAdd(files,function(){
zip.writeToFile('C:/Desarrollo/zip/01012017.zip');
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
    text: 'Se envían adjuntos los archivos timbrados 03 01 2017', // plaintext body 
    html: '<b>Se envían adjuntos los archivos timbrados 03 01 2017</b>', // html body 
    attachments: [
        {   // file on disk as an attachment
            filename: '01012017.zip',
            path: 'C:/Desarrollo/zip/01012017.zip' // stream this file
        }
    ]
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});


//module.exports = ZipandMail;
