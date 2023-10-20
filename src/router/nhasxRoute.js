const nhasxController = require('../controllers/nhasxControllers');
const express = require('express');
const router = express.Router();

router.get('/nhasx', nhasxController.getnhasxAll);
router.get('/nhasx/show/:id', nhasxController.getnhasxById);
router.post('/nhasx/create', nhasxController.createnhasx);
router.get('/nhasx/create', nhasxController.createnhasx2);
router.post('/nhasx/update/:id', nhasxController.updatenhasx);
router.get('/nhasx/update/:id', nhasxController.updatenhasx2);
router.delete('/nhasx/delete/:id', nhasxController.deletenhasx);

module.exports = router;