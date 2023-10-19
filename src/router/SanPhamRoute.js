const SanPhamController = require('../controllers/SanPhamControllers');
const express = require('express');
const router = express.Router();

router.get('/sanpham', SanPhamController.getsanphamAll);
router.get('/sanpham/show/:id', SanPhamController.getsanphamById);
router.post('/sanpham/create', SanPhamController.createsanpham);
router.get('/sanpham/create', SanPhamController.createsanpham2);
router.post('/sanpham/update/:id', SanPhamController.updatesanpham);
router.get('/sanpham/update/:id', SanPhamController.updatesanpham2);
router.delete('/sanpham/delete/:id', SanPhamController.deletesanpham);

module.exports = router;