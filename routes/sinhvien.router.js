const router = require('express').Router();
var sinhVienController = require('../controllers/sinhvien')
router.get('/', sinhVienController.getDanhSach);
module.exports = router;