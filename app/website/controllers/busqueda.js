var BusquedaView = require('../views/reference'),
    BusquedaModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Busqueda = function(conf) {
    this.conf = conf || {};

    this.view = new BusquedaView();
    this.model = new BusquedaModel({
        parameters: this.conf.parameters
    });

    this.response = function() {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Busqueda.prototype.get_timbrados = function(req, res, next) {
    var self = this;

    var params = [
        { name: 'idDepartamento', value: req.query.idDepartamento, type: self.model.types.INT },
        { name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT },
        { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT },
        { name: 'idGrupo', value: req.query.idGrupo, type: self.model.types.INT },
        { name: 'idTipoNomina', value: req.query.idTipoNomina, type: self.model.types.INT },
        { name: 'carpeta', value: req.query.carpeta, type: self.model.types.STRING }
    ];

    this.model.query('SEL_BUSQUEDA_TIMBRADOS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Busqueda;
