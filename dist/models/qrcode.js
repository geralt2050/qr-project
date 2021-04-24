"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _mongoose = _interopRequireDefault(require("mongoose"));

var Schema = _mongoose["default"].Schema;
var qrcodeSchema = new Schema({
  image: String,
  code: String,
  link: String
});
module.exports = _mongoose["default"].model("qrcode", qrcodeSchema);