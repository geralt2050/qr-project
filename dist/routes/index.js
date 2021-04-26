"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var express = require('express');

var Qr = require('../models/qrcode');

var User = require('../models/users');

"";

var QRCode = require('qrcode');

var router = express.Router();

var auth = function auth(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('success_msg', 'Pls Login to continue');
  res.redirect("/login");
};

router.get('/', function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.roleId === "admin") {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/dashboard');
    }
  } else {
    res.render('index');
  }
});
router.post('/update-link', auth, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var qrcode;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.body.code);
            _context.next = 3;
            return Qr.findOne({
              code: req.body.code
            });

          case 3:
            qrcode = _context.sent;
            Qr.updateOne({
              _id: qrcode.id
            }, {
              $set: {
                link: req.body.link
              }
            }).then(function () {
              req.flash('success_msg', 'Embeded link has been updated!');
              res.redirect('dashboard');
            })["catch"](function (err) {
              req.flash('error_msg', 'Embeded link update failed');
              res.redirect('dashboard');
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/dashboard', auth, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var qrcodelist;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Qr.findOne({
              code: req.body.code
            });

          case 2:
            qrcodelist = _context2.sent;

            if (!qrcodelist) {
              req.flash('warning_msg', 'That promocode doesn`t exist');
            }

            res.redirect('/dashboard'); // res.render('dashboard', {
            //     qr: qrfield
            // });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/dashboard', auth, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    var qrId, qrfield;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // for (var i = 0; i < 999999; i++) {
            //     let payload = {
            //         content: String(i).padStart(6, '0') + ".png",
            //         promocode: "A" + String(i).padStart(6, '0'),
            //     }
            //     let qrcode = await Qr.create(payload);
            // }
            // await Qr.deleteMany();
            // let qrcode = await Qr.find();
            // console.log(qrcode.length);
            // let a = Math.random();
            // a = Math.floor(a * 1000000);
            // QRCode.toDataURL("https://c.skanz.live/A" + a, function (err, url) {
            //     res.render('dashboard', {
            //         qr: url
            //     });
            // })
            qrfield = "";

            if (!(req.user.qrcodes.length > 0)) {
              _context3.next = 6;
              break;
            }

            qrId = req.user.qrcodes[0];
            _context3.next = 5;
            return Qr.findOne({
              _id: qrId
            });

          case 5:
            qrfield = _context3.sent;

          case 6:
            res.render('dashboard', {
              qr: qrfield
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}());
router.get('/shop', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            res.render('shop');

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/code/:promocode", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var promocode, qr;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            promocode = req.params.promocode;
            _context5.next = 3;
            return Qr.findOne({
              promocode: promocode
            });

          case 3:
            qr = _context5.sent;
            res.render('qrcode', {
              data: qr.content
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}());
router.post('/choose-type', auth, /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var membertype, promocode, payload, qrcode;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            membertype = req.body.membertype;
            promocode = req.body.promocode;
            payload = {
              image: "",
              code: "",
              link: "http://skanz.live"
            };

            if (!(membertype === "0")) {
              _context6.next = 7;
              break;
            }

            res.redirect('/shop'); //Don't have qr code
            // let a = Math.random();
            // a = Math.floor(a * 1000000);
            // payload.code = "A" + a;
            // let qrList = await Qr.findOne({ code: payload.image });
            // if (!qrList) {
            //     let promise = new Promise((resolve, reject) => {
            //         let segs = "http://c.skanz.live/" + payload.code;
            //         QRCode.toDataURL(segs, function (err, url) {
            //             resolve(url);
            //         })
            //     });
            //     let url = await promise;
            //     payload.image = url;
            //     let qrcode = await Qr.create(payload);
            //     let user = await User.findOne({ _id: req.user.id });
            //     await User.updateOne({ _id: req.user.id }, { $push: { qrcodes: qrcode.id } });
            // }

            _context6.next = 16;
            break;

          case 7:
            _context6.next = 9;
            return Qr.findOne({
              code: promocode
            });

          case 9:
            qrcode = _context6.sent;

            if (!qrcode) {
              _context6.next = 15;
              break;
            }

            _context6.next = 13;
            return User.updateOne({
              _id: req.user.id
            }, {
              $push: {
                qrcodes: qrcode.id
              }
            });

          case 13:
            _context6.next = 16;
            break;

          case 15:
            req.flash('warning_msg', 'That promocode doesn`t exist');

          case 16:
            res.redirect('back');

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x16, _x17, _x18) {
    return _ref6.apply(this, arguments);
  };
}());
router.get('/contacts', auth, function (req, res, next) {
  res.render('contacts');
});
router.get('/profile', auth, function (req, res, next) {
  res.render('profile');
});
router.get('/settings', auth, function (req, res, next) {
  res.render('settings');
});
module.exports = router;