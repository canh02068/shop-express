// controllers/userController.js

const { render } = require('ejs');
const db = require('../connects'); // Import module kết nối cơ sở dữ liệu

// Hàm để lấy danh sách người dùng từ cơ sở dữ liệu
exports.home = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/home', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.shop = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/shop', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.about = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/about', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.blog = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/blog', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.contact = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/contact', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.shopping = async(req, res) => {

    try {
        const SP = await new Promise((resolve, reject) => {
            db.query('select * from sanpham', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from loaihang', (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/shopping', {
                        SP: SP,
                        loaihang: results
                    });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};
exports.loai = async(req, res) => {
    const { id } = req.params;
    try {
        const SPL = await new Promise((resolve, reject) => {
            db.query('select * from sanpham sp inner join loaihang lsp on sp.LoaiHangID = lsp.LoaiHangID where lsp.LoaiHangID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
        const LoaiSP2 = await new Promise((resolve, reject) => {
            db.query('select * from sanpham sp inner join loaihang lsp on sp.LoaiHangID = lsp.LoaiHangID where lsp.LoaiHangID = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    res.render('home/loai', {
                        SPL: SPL,
                        loaihang: results
                    });
                }
            });
        });
        
    } catch (err) {
        res.status(500).json({ message: 'Lỗi', error: err });
    }
};