const giasanphamController = require('../controllers/giasanphamControllers');
const express = require('express');
const router = express.Router();

router.get('/giasanpham', giasanphamController.getgiasanphamAll);
router.get('/giasanpham/show/:id', giasanphamController.getgiasanphamById);
router.post('/giasanpham/create', giasanphamController.creategiasanpham);
router.get('/giasanpham/create', giasanphamController.creategiasanpham2);
router.post('/giasanpham/update/:id', giasanphamController.updategiasanpham);
router.get('/giasanpham/update/:id', giasanphamController.updategiasanpham2);
router.delete('/giasanpham/delete/:id', giasanphamController.deletegiasanpham);

module.exports = router;