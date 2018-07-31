'use strict';

var _ = require('lodash');
var moment = require('moment');
var Schema = require('mongoose').Schema;

var db = require('../../Common/db');
var define = require('../../Common/define');

var ValidationSchema = new Schema({
    phone: { type: String, required: true },
    vtype: { type: Number, required: true, enum: _.values(define.ValidationType) },
    value: { type: String, required: true },
    createtime: { type: Number, required: true, default: function () { return moment().unix(); } },
});

module.exports = db.model('Validation', ValidationSchema);