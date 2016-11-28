"use strict";

var express = require('express');
var router = express.Router();
// var helper = require('./routeHelp');

var megaRouteHelper = {
   
    setup : function(insertQuery, updateQuery, deleteQuery, selectOneQuery, selectAllQuery, helper, pg, connectionString, getDataArray, getDataAndIdArray) {

        router.route('/')
            .post(function (req, res, next) {
                return helper.insertItem(res,
                                        connectionString,
                                        pg,
                                        insertQuery,
                                        getDataArray(req),
                                        selectOneQuery
                                        );
            })
            .get(function (req, res, next) {
                return helper.selectItems(res,
                                        connectionString,
                                        pg,
                                        selectAllQuery,
                                        []);
            })
            ;
        router.route('/:id')
            .put(function (req, res, next) {
                var id = req.params.id;
                return helper.updateItem (res, 
                                        connectionString, 
                                        pg, 
                                        id, 
                                        updateQuery, 
                                        getDataAndIdArray(req, id),                                 
                                        selectOneQuery
                                        );
            })
            .get(function (req, res, next) {
                var id = req.params.id;
                return helper.selectItem(res,
                                        connectionString,
                                        pg,
                                        selectOneQuery,
                                        [id]
                                        );
            })
            .delete(function (req, res, next) {
                var id = req.params.id;
                return helper.deleteItem(res,
                                        connectionString,
                                        pg,
                                        id,
                                        deleteQuery,
                                        selectOneQuery
                                        );
            })
            ;
        router.route('/Page/:items/:page')
            .get(function (req, res, next) {
                var items = req.params.items;
                var page = req.params.page;
                var offset = items * page;
                return helper.selectItems(res,
                                        connectionString,
                                        pg,
                                        selectAllQuery + helper.LIMIT_AND_OFFSET,
                                        [items, offset]);
            })
            ;
        return router;
    }
};

module.exports = megaRouteHelper;