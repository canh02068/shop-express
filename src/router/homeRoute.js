const homeController = require('../controllers/homeControllers');
const express = require('express');
const router = express.Router();

router.get('/', homeController.home);
router.get('/shop', homeController.shop);
router.get('/about', homeController.about);
router.get('/blog', homeController.blog);
router.get('/contact', homeController.contact);
router.get('/shopping', homeController.shopping);
router.get('/loai/:id', homeController.loai);
module.exports = router;