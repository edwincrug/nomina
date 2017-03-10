var FiltrosView = require('../views/reference'),
    FiltrosModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Filtros = function (conf) {
    this.conf = conf || {};

    this.view = new FiltrosView();
    this.model = new FiltrosModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Filtros.prototype.get_grupo = function (req, res, next) {

    var self = this;

    var params = [{name: 'idUsuario',value: req.query.idUsuario,type: self.model.types.INT}];

    this.model.query('SEL_GRUPO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
Filtros.prototype.get_empresa = function (req, res, next) {

    var self = this;

    var params = [{name: 'idGrupo',value: req.query.idGrupo,type: self.model.types.INT}];

    this.model.query('SEL_EMPRESAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
Filtros.prototype.get_agencia = function (req, res, next) {

    var self = this;

    var params = [{name: 'idEmpresa',value: req.query.idEmpresa ,type: self.model.types.INT}];

    this.model.query('SEL_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
Filtros.prototype.get_departamento = function (req, res, next) {

    var self = this;

    var params = [{name: 'idEmpresa',value: req.query.idEmpresa ,type: self.model.types.INT},
                  {name: 'idSucursal',value: req.query.idSucursal  ,type: self.model.types.INT}  ];

    this.model.query('SEL_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};
//[]
Filtros.prototype.get_tipoNomina = function (req, res, next) {

    var self = this;

    var params = [];

    this.model.query('SEL_TIPO_NOMINA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};// agrege este paramerametro

Filtros.prototype.get_validarDocumentosTimbrados = function (req, res, next) {

    var self = this;

    var params = [{name: 'nombreNomina',value: req.query.nombreNomina ,type: self.model.types.STRING},
                    {name: 'idEmpresa',value: req.query.idEmpresa ,type: self.model.types.INT},
                    {name: 'tipoNomina',value: req.query.tipoNomina ,type: self.model.types.INT}];

    this.model.query('SEL_DOCUMENTOS_TIMBRADOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Filtros;
