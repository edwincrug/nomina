var FileTreeView = require('../views/reference'),
    FileTreeModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');
var dirTree = require('directory-tree');



var FileTree = function (conf) {
    this.conf = conf || {};

    this.view = new FileTreeView();
    this.model = new FileTreeModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};



FileTree.prototype.get_files = function(req, res, next) {
    var self = this;

    var params = [{name: 'idEmpresa',value: req.query.idEmpresa  ,type: self.model.types.STRING},
                {name: 'idTipo',value: req.query.idTipo ,type: self.model.types.INT}];

    this.model.query('SEL_RUTAS_ORIGEN_SP', params, function (error, result) {
        var trees = dirTree(result[0].RutaDescripcion);

        self.view.expositor(res, {
            error: error,
            result: trees
        });
    });
//     var tree = dirTree('C:/Users/hitma/Documents/Prueba');
// var trees = dirTree('C:/Users/hitma/Documents/Meta 4/');
// res.json({
//             error_code: 0,
//             err_desc: null,
//             datos: tree
//         });
};

module.exports = FileTree;
