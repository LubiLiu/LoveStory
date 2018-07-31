'use strict';

var _ = require('lodash');
var moment = require('moment');
var Schema = require('mongoose').Schema;

var db = require('../../Common/db');
var define = require('../../Common/define');

var PlayerSchema = new Schema({
    phone: { type: String, required: true },
    password: { type: String },
    token: { type: String },
    serverName: { type: String },
    createtime: { type: Number, required: true, default: function () { return moment().unix(); } },
    updatetime: { type: Number, required: true, default: function () { return moment().unix(); } }
});

module.exports = db.model('Player', PlayerSchema);