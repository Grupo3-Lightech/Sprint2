var express = require("express");
var router = express.Router();

var locaisController = require("../controllers/locaisController");

router.get("/listar/:idEmpresa", function (req, res) {
    locaisController.listar(req, res);
});


module.exports = router;