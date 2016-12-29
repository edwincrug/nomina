var FileTreeView = require('../views/reference'),
    FileTreeModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var dirTree = require('directory-tree');
var net = require('net');
var client = new net.Socket();



var FileTree = function(conf) {
    this.conf = conf || {};

    this.view = new FileTreeView();
    this.model = new FileTreeModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

FileTree.prototype.get_socket = function(req, res, next) {
    var datos = [];
    var envio = JSON.stringify({idEmpresa: 21,
                                idTipo: 1,
                                idUsuario:1,
                                pach:'C:\Nomina_Timbrado\Origen\Semanal\004\01052016',
                                nombreCarpeta:'01052016'})


    client.connect(3000, '192.168.50.92', function() {
        console.log('Connected');
        client.write(envio);
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
        datos = data.toString('utf8');
        res.json({
        data: datos
    });
        client.destroy(); // kill client after server's response
    });


    client.on('close', function() {
        console.log('Connection closed');
    });
console.log(envio)
    
}


FileTree.prototype.get_files = function(req, res, next) {
    var self = this;

    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.STRING },
        { name: 'idTipo', value: req.query.idTipo, type: self.model.types.INT }
    ];

    this.model.query('SEL_RUTAS_ORIGEN_SP', params, function(error, result) {
        var trees = dirTree(result[0].RutaDescripcion);
        var elementos = [];
        var elementosValidos = [];
        var elementosFinales = [];

        for (var i = 0; i < trees.children.length; i++) {
            if (trees.children[i].name.length == 8) {
                if (trees.children[i].children.length == 0) {
                    elementos.push({
                        fila: i
                    })
                } else {
                    elementosValidos.push({
                        datos: trees.children[i]
                    })
                }
            } else {}
        }
        for (var h = 0; h < elementosValidos.length; h++) {
            if ((elementosValidos[h].datos.name.substr(0, 2) <= 31 && elementosValidos[h].datos.name.substr(0, 2) > 0) && (elementosValidos[h].datos.name.substr(2, 2) <= 12 && elementosValidos[h].datos.name.substr(2, 2) > 0) && (elementosValidos[h].datos.name.substr(4, 4) <= 9999 && elementosValidos[h].datos.name.substr(4, 4) > 0)) {
                elementosFinales.push({ datos: elementosValidos[h].datos })
            } else {}
        }
        console.log(elementosFinales)
        self.view.expositor(res, {
            error: error,
            result: elementosFinales
        });
    });
};

module.exports = FileTree;
