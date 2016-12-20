var ReferenceView = require('../views/reference'),
    ReferenceModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


var Reference = function (conf) {
    this.conf = conf || {};

    this.view = new ReferenceView();
    this.model = new ReferenceModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};


Reference.prototype.get_facturasAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

module.exports = Reference;

