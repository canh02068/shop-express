const loaiSPController = require('../controllers/loaiSPControllers');
const express = require('express');
const router = express.Router();

router.get('/loaisp', loaiSPController.getLoaiSPAll);
router.get('/loaisp/show/:id', loaiSPController.getLoaispById);
router.post('/loaisp/create', loaiSPController.createLoaisp);
router.get('/loaisp/create', loaiSPController.createLoaisp2);
router.post('/loaisp/update/:id', loaiSPController.updateLoaisp);
router.get('/loaisp/update/:id', loaiSPController.updateLoaisp2);
router.delete('/loaisp/delete/:id', loaiSPController.deleteLoaisp);

module.exports = router;