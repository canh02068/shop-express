const nhaccController = require('../controllers/nhaccControllers');
const express = require('express');
const router = express.Router();

router.get('/nhacc', nhaccController.getnhaccAll);
router.get('/nhacc/show/:id', nhaccController.getnhaccById);
router.post('/nhacc/create', nhaccController.createnhacc);
router.get('/nhacc/create', nhaccController.createnhacc2);
router.post('/nhacc/update/:id', nhaccController.updatenhacc);
router.get('/nhacc/update/:id', nhaccController.updatenhacc2);
router.delete('/nhacc/delete/:id', nhaccController.deletenhacc);

module.exports = router;